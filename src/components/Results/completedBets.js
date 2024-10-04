import React, { useEffect, useState } from 'react';
import { FaUserCheck, FaUserTimes, FaRupeeSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CompletedBets = () => {
  const [completedBets, setCompletedBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    // Fetch completed bets
    fetch('http://localhost:3001/completedBets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
      .then(response => response.json())
      .then(data => {
        setCompletedBets(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching completed bets:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-2xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
  <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">Your Completed Bets</h1>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {completedBets.length === 0 ? (
      <div className="text-gray-600 text-center text-xl">No completed bets found.</div>
    ) : (
      completedBets.map(bet => (
        <div
          key={bet._id}
          className={`rounded-lg shadow-lg p-6 flex flex-col transition-transform transform hover:scale-105 ${
            bet.betOutcome === 'Won' ? 'bg-green-300' : 'bg-red-300'
          } border-2 border-opacity-20 hover:border-opacity-100 ${
            bet.betOutcome === 'Won' ? 'border-green-500' : 'border-red-500'
          }`}
        >
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">{bet.title}</h3>
          <p className="text-lg mb-4 text-gray-600 overflow-hidden">
            Contest ID: <span className="font-bold truncate  max-w-xs">{bet.contestId}</span>
          </p>
          <div className="flex flex-col mb-4">
            <div className="flex items-center mb-3">
              <FaUserCheck className="text-gray-800 mr-2 text-2xl" />
              <span className="text-lg text-gray-800">
                Your Bet: <span className="font-bold">{bet.myBet}</span>
              </span>
            </div>
            <div className="flex items-center mb-3">
              <FaUserTimes className="text-gray-800 mr-2 text-2xl" />
              <span className="text-lg text-gray-800">
                Opponent: <span className="font-bold">{bet.oppositeUserName}</span>
              </span>
              <span className="flex items-center ml-4">
                <FaRupeeSign className="text-gray-800 mr-1 text-xl" />
                <span className="font-bold text-gray-800">{bet.opponentBet}</span>
              </span>
            </div>
            <div className="mt-4 text-center">
              <span className={`text-lg font-semibold ${bet.betOutcome === 'Won' ? 'text-green-600' : 'text-red-600'}`}>
                {bet.betOutcome === 'Won' ? '🎉 You Won!' : '❌ You Lost!'}
              </span>
            </div>
          </div>
        </div>
      ))
    )}
  </div>

  <div className="text-center mt-8">
    <button
      onClick={() => navigate('/home')}
      className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
    >
      Go to Home
    </button>
  </div>
</div>

  );
};

export default CompletedBets;
