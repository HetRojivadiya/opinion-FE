import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Adjust the import path according to your structure
import SuccessModal from './SuccessModal'; // Import the new SuccessModal
import betImage from "../../assets/Header/bet_placed.jpg";
import { useNavigate } from 'react-router-dom';

const BattingList = () => {
  const [battingData, setBattingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // State for success modal
  const [selectedBet, setSelectedBet] = useState(null);
  const [betLoading, setBetLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://opinion-fe.onrender.com/liveContest');
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

  const calculatePrice = (odds) => {
    return odds;
  };

  const handleBetClick = (bet, option, price) => {
    setSelectedBet({ bet, option, price });
    setIsModalOpen(true);
    setMessage('');
  };

  const handleSubmitBet = async () => {
    if (!selectedBet) return;

    const { bet, option, price } = selectedBet;
    const userId = localStorage.getItem('userId');

    setBetLoading(true);
    setMessage('');

    try {
      const response = await fetch('https://opinion-fe.onrender.com/placeBet', {
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
        setMessage(result.message); // Set success message
        setIsSuccessModalOpen(true); // Open success modal
        setIsModalOpen(false); // Close the main modal
      } else {
        setMessage(result.message); // Set error message
      }
    } catch (error) {
      console.error('Error placing the bet:', error);
      setMessage('An error occurred while placing the bet.');
    }

    setBetLoading(false);
  };

  const handleRedirect = () => {
    // Logic to navigate to SeePlacedBets component
    // Assuming you're using react-router
    // window.location.href = '/About'; 
    navigate('/confirmedBets')
    // Redirect to the placed bets page
  };

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
                
              </button>
              <button
                className="relative bg-red-500 text-white px-8 py-1 rounded-lg shadow-md hover:bg-red-600 transition duration-300 text-sm"
                onClick={() => handleBetClick(batting, 'NO', calculatePrice(batting.no_odds))}
              >
                No (₹{calculatePrice(batting.no_odds)})
                
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitBet}
        option={selectedBet?.option}
        price={selectedBet?.price}
        imageUrl={betImage}
        loading={betLoading}
        message={message}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message={message}
        onRedirect={handleRedirect} // Redirect function
      />
    </div>
  );
};

export default BattingList;
