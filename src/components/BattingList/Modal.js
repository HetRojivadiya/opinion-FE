import React from 'react';

// Modal Component
const Modal = ({ isOpen, onClose, onSubmit, option, price, imageUrl, loading, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        {loading ? (
          <div className="flex flex-col justify-center items-center space-y-4">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
            <p className="text-lg font-semibold text-blue-500">Placing your bet...</p>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-2 text-center">Confirm Your Bet</h2>
            <img src={imageUrl} alt={`Bet on ${option}`} className="w-full h-40 object-cover rounded-md mb-4" />
            <p className="text-center mb-4">Are you sure you want to place a bet on <strong>{option}</strong> for <strong>{price}</strong>?</p>
            {message && <p className="text-center mb-4 text-red-500">{message}</p>} {/* Display message */}
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

export default Modal;
