import React from 'react';
import GIF from "../../assets/Home/bet/success.gif";

const SuccessModal = ({ isOpen, onClose, message, onRedirect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-lg font-semibold mb-2">Your Order is Placed!</h2>
        <img 
          src={GIF} 
          alt="Success" 
          className="w-40 h-40 object-cover mb-4 ml-14" 
        />
        <p className="mb-4 text-green-500">{message}</p>
        <button
          onClick={onRedirect}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Placed Bets
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
