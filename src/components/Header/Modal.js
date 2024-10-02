import React from 'react';
import DepositImage from "../../assets/Header/deposite_withdraw.jpg"; // Move image import here

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  type, // type prop to differentiate between modals
  depositAmount, 
  setDepositAmount, 
  handleDepositModalOpen, 
  handlePayment 
}) => {
  if (!isOpen) return null;

  const renderContent = () => {
    switch(type) {
      case 'depositWithdraw':
        return (
          <div className="flex flex-col items-center">
            {/* Displaying the image */}
            <img
              src={DepositImage}
              alt="Deposit and Withdraw"
              className="mb-4 w-full rounded-lg"
            />

            {/* Deposit and Withdraw buttons */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2 w-full"
              onClick={handleDepositModalOpen}
            >
              Deposit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
              onClick={() => alert("Withdraw Functionality")}
            >
              Withdraw
            </button>
          </div>
        );
      case 'enterDepositAmount':
        return (
          <div className="flex flex-col items-center">
            <input
              type="number"
              min="50"
              max="1000"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Enter amount (50 - 1000)"
              className="border p-2 mb-4 w-full rounded"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2 w-full"
              onClick={handlePayment}
              disabled={depositAmount < 50 || depositAmount > 1000}
            >
              Pay ₹{depositAmount}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            className="text-red-500 hover:text-red-700 text-2xl font-bold"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Modal;
