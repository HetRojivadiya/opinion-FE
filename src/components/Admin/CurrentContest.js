import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrentContest = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedContest, setSelectedContest] = useState(null); // State for selected contest
  const [responseMessage, setResponseMessage] = useState(''); // State for API response
  const [popupVisible, setPopupVisible] = useState(false); // State for popup visibility

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://opinion-be.onrender.com/liveContest');
      setContests(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching contests:", error);
      setError("Error retrieving contests");
    }
    setLoading(false);
  };

  const openPopup = (contestId) => {
    setSelectedContest(contestId);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedContest(null);
    setResponseMessage('');
  };

  const handleOptionClick = async (option) => {
    try {
      const response = await axios.post('https://opinion-be.onrender.com/selectWinner', {
        contestId: selectedContest,
        winnerOption: option,
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error("Error selecting winner:", error);
      setResponseMessage("An error occurred while settling the contest.");
    }
    setTimeout(() => closePopup(), 2000); // Close popup after 2 seconds
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Current Contests</h1>

      {loading ? (
        <div className="text-center text-gray-600">Loading contests...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : contests.length === 0 ? (
        <div className="text-center text-gray-500">No contests available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{contest.title}</h2>
              <p className="text-gray-600 mb-2"><strong>Teams:</strong> {contest.home_team} vs {contest.away_team}</p>
              <button
                onClick={() => openPopup(contest.id)}
                className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Settle Contest
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Popup for selecting winner */}
      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg text-center w-80 animate-slide-in">
            <h3 className="text-lg font-semibold mb-4">Select Winner</h3>
            <button
              onClick={() => handleOptionClick('YES')}
              className="w-full py-2 mb-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              YES
            </button>
            <button
              onClick={() => handleOptionClick('NO')}
              className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              NO
            </button>
            <button
              onClick={closePopup}
              className="mt-4 w-full py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            {responseMessage && (
              <p className="text-gray-700 mt-4">{responseMessage}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentContest;
