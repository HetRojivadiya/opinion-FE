import React, { useState, useEffect } from 'react';
import betImage from "../../assets/Header/bet_placed.jpg";

// Modal Component
const Modal = ({ isOpen, onClose, onSubmit, option, price, imageUrl, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        {loading ? (
         <div className="flex flex-col justify-center items-center space-y-4">
         {/* Enhanced Spinner */}
         <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
         
         {/* Loading Text */}
         <p className="text-lg font-semibold text-blue-500">Placing your bet...</p>
       </div>
       
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-2 text-center">Confirm Your Bet</h2>
            <img src={imageUrl} alt="Bet image" className="w-full h-40 object-cover rounded-md mb-4" />
            <p className="text-center mb-4">Are you sure you want to place a bet on <strong>{option}</strong> for <strong>{price}</strong>?</p>
            <div className="flex justify-between">
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const BattingList = () => {
  const [battingData, setBattingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);
  const [price, setPrice] = useState(null); 
  const [betLoading, setBetLoading] = useState(false); // Track loading state for bet submission

  // Fetching live contest data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/liveContest');
        if (!response.ok) {
          throw new Error('Failed to fetch live contests');
        }
        const data = await response.json();
        setBattingData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate the price based on the odds
  const calculatePrice = (odds) => {
    return (10 * odds).toFixed(0);
  };

  // Open modal and set selected bet
  const handleBetClick = (bet, option, price) => {
    setSelectedBet({ bet, option, price });
    setIsModalOpen(true);
  };

  // Handle submitting the bet to the backend
  const handleSubmitBet = async () => {
    if (!selectedBet) return;

    const { bet, option, price } = selectedBet;
    const userId = localStorage.getItem('userId'); 

    setBetLoading(true); // Show the loading spinner when submitting

    try {
      const response = await fetch('http://localhost:3001/placeBet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: bet.id,
          userId,
          option,
          price,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message); 
      } else {
        alert(result.message); 
      }
    } catch (error) {
      console.error('Error placing the bet:', error);
      alert('An error occurred while placing the bet.');
    }

    setBetLoading(false); // Stop the loading spinner after submission
    setIsModalOpen(false); 
  };

  // Display a loading spinner or error message
  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="batting-list p-4 bg-black rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">Trending Bets</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {battingData.map((batting) => (
          <li key={batting._id} className="bg-gray-800 p-3 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <h3 className="text-lg font-medium mb-1 text-white hover:text-gray-400 transition duration-300">{batting.title}</h3>
            <p className="text-gray-300 mb-3 text-sm">
              {batting.home_team} vs {batting.away_team}
            </p>
            <div className="flex justify-between items-center">
              <button
                className="relative bg-blue-500 text-white px-8 py-1 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 text-sm"
                onClick={() => handleBetClick(batting, 'YES', calculatePrice(batting.yes_odds))}
              >
                Yes (₹{calculatePrice(batting.yes_odds)})
                <span className="text-xs text-gray-300 block">Odds: {batting.yes_odds}</span>
              </button>
              <button
                className="relative bg-red-500 text-white px-8 py-1 rounded-lg shadow-md hover:bg-red-600 transition duration-300 text-sm"
                onClick={() => handleBetClick(batting, 'NO', calculatePrice(batting.no_odds))}
              >
                No (₹{calculatePrice(batting.no_odds)})
                <span className="text-xs text-gray-300 block">Odds: {batting.no_odds}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for confirming bet */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitBet}
        option={selectedBet?.option}
        price={selectedBet?.price}
        imageUrl={betImage} 
        loading={betLoading} // Pass loading state to the modal
      />
    </div>
  );
};

export default BattingList;
