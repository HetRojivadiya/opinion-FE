// src/components/SeeSportsData.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SeeSportsData = () => {
  const { key } = useParams();
  const [sportsData, setSportsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [existingContests, setExistingContests] = useState(new Set());
  const [showPopup, setShowPopup] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);
  const [title, setTitle] = useState('');
  const [odds, setOdds] = useState('');
  const [successPopup, setSuccessPopup] = useState(false); // Success message state

  useEffect(() => {
    fetchSportsData();
  }, []);

  const fetchSportsData = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://opinion-be.onrender.com/getSpecificSports/', { key });
      setSportsData(response.data);
      await checkExistingContests();
    } catch (error) {
      console.error("Error fetching sports data:", error);
    }
    setLoading(false);
  };

  const checkExistingContests = async () => {
    try {
      const response = await axios.post('https://opinion-be.onrender.com/alreadyExist');
      const existingIds = new Set(response.data);
      setExistingContests(existingIds);
    } catch (error) {
      console.error("Error checking existing contests:", error);
    }
  };

  const handleCreateContestClick = (contest) => {
    setSelectedContest(contest);
    setTitle('');
    setOdds('');
    setShowPopup(true);
  };

  const submitContest = async () => {
    const { id,  sport_title, home_team, away_team } = selectedContest;
    try {
      const response = await axios.post('https://opinion-be.onrender.com/createContest', {
        id,
        title,
        sports_key: key,
        sport_title,
        home_team,
        away_team,
        odds: parseFloat(odds),
      });
      if (response.data.message === 'entry added successfully') {
        setExistingContests((prev) => new Set([...prev, id]));
        setShowPopup(false);
        setSuccessPopup(true); // Show success popup
        setTimeout(() => setSuccessPopup(false), 3000); // Hide after 3 seconds
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error creating contest:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen relative">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Sports Details</h1>

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : sportsData.length ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Available Sports Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border-b">Sport Title</th>
                  <th className="py-2 px-4 border-b">Teams</th>
                  <th className="py-2 px-4 border-b">Betting Odds</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sportsData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b text-gray-700">{item.sport_title}</td>
                    <td className="py-2 px-4 border-b text-gray-700">
                      {item.home_team} vs. {item.away_team}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-700">
                      {item.bookmakers && item.bookmakers[0] && item.bookmakers[0].markets
                        ? item.bookmakers[0].markets.map((market, i) => (
                            <div key={i}>
                              {market.outcomes.slice(0, 3).map((outcome, j) => (
                                <div key={j} className="pl-2">
                                  {outcome.name}: {outcome.price}
                                </div>
                              ))}
                            </div>
                          ))
                        : 'No betting odds available'}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {existingContests.has(item.id) ? (
                        <button disabled className="bg-gray-400 text-white px-4 py-2 rounded-lg">
                          Contest Exists
                        </button>
                      ) : (
                        <button
                          onClick={() => handleCreateContestClick(item)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                          Create Contest
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">No sports data available</div>
      )}

      {/* Popup Modal for Creating Contest */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Contest</h2>
            <div className="mb-4">
              <strong>Sport Title:</strong> {selectedContest.sport_title}
            </div>
            <div className="mb-4">
              <strong>Teams:</strong> {selectedContest.home_team} vs {selectedContest.away_team}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Contest Title</label>
              <input
                type="text"
                className="border rounded px-4 py-2 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Odds</label>
              <input
                type="number"
                step="0.5"
                className="border rounded px-4 py-2 w-full"
                value={odds}
                onChange={(e) => setOdds(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={submitContest}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message Popup */}
      {successPopup && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade">
          🎉 Contest Created Successfully!
        </div>
      )}

      {/* Inline CSS Styles */}
      <style>{`
        .animate-fade {
          animation: fadeInOut 3s ease-in-out;
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SeeSportsData;
