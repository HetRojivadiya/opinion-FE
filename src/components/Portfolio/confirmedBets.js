import React, { useEffect, useState } from 'react';
import { FaUserCheck, FaUserTimes, FaRupeeSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ConfirmedBets = () => {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Fixed this line

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    fetch('https://opinion-be.onrender.com/confirmedBets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }), // Send userId in the request body
    })
      .then(response => response.json())
      .then(data => {
        setBets(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching confirmed bets:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    
    <div className="container mx-auto p-6 ">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 font-mono">Your Confirmed Bets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bets.length === 0 ? (
          <div className="text-gray-600 ">No confirmed bets found.</div>
        ) : (
          bets.map(bet => (
            <div key={bet._id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg p-6 flex flex-col transition-transform transform hover:scale-105">
              <h2 className="text-2xl font-semibold mb-3 text-white">{bet.title}</h2>
              <p className="text-lg mb-4 text-gray-300">Contest ID: <span className="font-bold">{bet.contestId}</span></p>
              <div className="flex flex-col mb-4">
                <div className="flex items-center mb-2">
                  <FaUserCheck className="text-green-400 mr-2" />
                  <span className="text-lg text-white">
                    Your Bet: <span className="font-bold">{bet.myBet}</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <FaUserTimes className="text-red-400 mr-2" />
                  <span className="text-lg text-white">
                    Opponent: <span className="font-bold">{bet.oppositeUserName}</span>
                  </span>
                  <span className="flex items-center ml-4">
                    <FaRupeeSign className="text-yellow-400 mr-1" />
                    <span className="font-bold text-white">{bet.opponentBet}</span>
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="text-center mt-6">
        <button
          onClick={() => navigate('/home')} // Redirect to "/home"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmedBets;
