import React from 'react';

const battingData = [
  { id: 1, title: 'Market Trends for 2024', description: 'Predict and discuss upcoming market trends for the next year.', yesPrice: '₹10', noPrice: '₹8' },
  { id: 2, title: 'Tech Innovations', description: 'Share opinions on the latest technological advancements and their impacts.', yesPrice: '₹15', noPrice: '₹12' },
  { id: 3, title: 'Climate Change Actions', description: 'Debate on the effectiveness of various climate change actions.', yesPrice: '₹20', noPrice: '₹18' },
  { id: 4, title: 'Stock Market Predictions', description: 'Forecast the rise and fall of major stock indices.', yesPrice: '₹25', noPrice: '₹22' },
  { id: 5, title: 'Electric Vehicles Adoption', description: 'Discuss the potential of electric vehicles to dominate the market.', yesPrice: '₹18', noPrice: '₹15' },
  { id: 6, title: 'AI Impact on Jobs', description: 'Predict the extent to which AI will impact employment sectors.', yesPrice: '₹30', noPrice: '₹28' },
];

const BattingList = () => {
  return (
    <div className="batting-list p-6 bg-black rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Trending Bets</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {battingData.map((batting) => (
          <li key={batting.id} className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <h3 className="text-xl font-semibold mb-2 text-white hover:text-gray-400 transition duration-300">{batting.title}</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">{batting.description}</p>
            <div className="flex justify-between items-center">
              <button className="relative bg-blue-500 text-white px-12 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                <span className="absolute inset-0 border-2 border-blue-700 rounded-lg" style={{ top: '-4px', left: '-4px', right: '-4px', bottom: '-4px' }}></span>
                Yes ({batting.yesPrice})
              </button>
              <button className="relative bg-red-500 text-white px-12 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300">
                <span className="absolute inset-0 border-2 border-red-700 rounded-lg" style={{ top: '-4px', left: '-4px', right: '-4px', bottom: '-4px' }}></span>
                No ({batting.noPrice})
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BattingList;
