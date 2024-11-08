import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompletedContests = () => {
  const [completedContests, setCompletedContests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDetails, setOpenDetails] = useState(null); // To toggle each contest's details

  useEffect(() => {
    fetchCompletedContests();
  }, []);

  const fetchCompletedContests = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/completedContest');
      setCompletedContests(response.data.completedContest);
      setError(null);
    } catch (error) {
      console.error('Error fetching completed contests:', error);
      setError('Error retrieving completed contests');
    }
    setLoading(false);
  };

  const toggleDetails = (id) => {
    setOpenDetails(openDetails === id ? null : id); // Toggle details for each contest
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Completed Contests</h1>

      {loading ? (
        <div className="text-center text-gray-600">Loading completed contests...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : completedContests.length === 0 ? (
        <div className="text-center text-gray-500">No completed contests available</div>
      ) : (
        <div className="space-y-6">
          {completedContests.map((contest) => (
            <div key={contest.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{contest.title}</h2>
                  <p className="text-gray-600"><strong>Sport:</strong> {contest.sport_title}</p>
                  <p className="text-gray-600"><strong>Teams:</strong> {contest.home_team} vs {contest.away_team}</p>
                  <p className="text-gray-600"><strong>Winner:</strong> {contest.winner}</p>
                </div>
                <button
                  onClick={() => toggleDetails(contest.id)}
                  className="text-blue-500 font-semibold focus:outline-none hover:text-blue-600 transition"
                >
                  {openDetails === contest.id ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
              
              {openDetails === contest.id && (
                <div className="mt-4 border-t border-gray-200 pt-4 space-y-2 transition-all duration-200">
                  <p><strong>Contest ID:</strong> {contest.id}</p>
                  <p><strong>Yes Odds:</strong> {contest.yes_odds}</p>
                  <p><strong>No Odds:</strong> {contest.no_odds}</p>
                  <p><strong>Yes Queue:</strong> {contest.yesQueue.map(q => `UserID: ${q.userId}, Price: ${q.price}`).join(', ')}</p>
                  <p><strong>No Queue:</strong> {contest.noQueue.map(q => `UserID: ${q.userId}, Price: ${q.price}`).join(', ')}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedContests;
