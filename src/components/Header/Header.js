import React, { useState, useEffect } from "react";
import WalletLogo from "../../assets/Header/wallet.png";
import AccountLogo from "../../assets/Header/account.png";
import DownArrowIcon from "../../assets/Header/down-arrow.png";
import CompanyLogo from "../../assets/Logo/logo.jpg";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Modal from "../Header/Modal"; // Modal Component
import refundImage from '../../assets/Payment/Refund.jpeg';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [userDetails, setUserDetails] = useState({
    fullname: '',
    email: '',
    mobile: '',
  });
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const [isModalWithdrawOpen, setIsModalWithdrawOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loadingModalOpen, setLoadingModalOpen] = useState(false);



  // Fetch user details when component is mounted
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch("https://opinion-be.onrender.com/checkToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        if (response.ok) {
          const detailsResponse = await fetch(
            "https://opinion-be.onrender.com/getUserDetails",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token }),
            }
          );

          const details = await detailsResponse.json();
          setUserDetails({
            fullname: details.fullname,
            email: details.email,
          });
          setWalletBalance(details.balance);  // Set wallet balance
        } else {
          console.error("Invalid token", data);
          navigate("/");
        }
      } catch (err) {
        console.error("Error verifying token:", err);
        navigate("/");
      }
    };

    verifyToken();
  }, [navigate]);

  // Handle opening and closing modals
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handleDepositModalOpen = () => setDepositModalOpen(true);
  const handleDepositModalClose = () => setDepositModalOpen(false);
  const handleWithdrawModalOpen = () => setWithdrawModalOpen(true);
  const handleWithdrawModalClose = () => setWithdrawModalOpen(false);

  // Handle payment process
  const handlePayment = async () => {
    const data = {
      name: `${userDetails.fullname}`,
      email: userDetails.email,
      amount: depositAmount,
    };

    try {
      const response = await axios.post(
        "https://opinion-be.onrender.com/payment/create-order",
        data
      );
      console.log(response.data);
      window.location.href = response.data.url;
    } catch (error) {
      console.log("error in payment", error);
    }
  };

  // Handle withdrawal process
  const handleWithdraw = async () => {
    const data = {
      name: `${userDetails.fullname}`,
      email: userDetails.email,
      amount: withdrawAmount,
    };

    try {
      const response = await axios.post(
        "https://opinion-be.onrender.com/withdraw",
        data
      );

      // Check if the response message is "Withdrawal successful"
      if (response.data.message === "Withdrawal successful") {
        setWithdrawModalOpen(false);
          setIsModalOpen(false);
        setLoadingModalOpen(true);
       
        // Use setTimeout for a 2-second delay
        setTimeout(() => {
          
          setLoadingModalOpen(false);
            setModalMessage("Your withdraw has been successful. The Money will be processed within 2-3 working days.");
            setIsModalWithdrawOpen(true); // Show the modal
    
            setWalletBalance(prev => prev - withdrawAmount); // Update wallet balance
        }, 2000); // 2000 milliseconds = 2 seconds
    }
     else {
        
        setLoadingModalOpen(false);
      }

    } catch (error) {
      console.log("error in withdrawal", error);
    }
  };

  const closeModal = () => {
    setIsModalWithdrawOpen(false);
    setModalMessage("");
  };

  // Handle dropdown toggle
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <header className="bg-black text-white p-4 flex items-center">
        {/* Left Section */}
        <div className="flex items-center justify-start w-1/3">
          <img src={CompanyLogo} alt="Company Logo" className="h-16 " />
          <h1 className="text-2xl md:text-2xl lg:text-3xl ml-2 homeTest hide-on-small">
            Opinion
          </h1>
        </div>

        {/* Center Section */}
        <div className="flex items-center justify-center w-1/3 cursor-pointer">
          <button
            onClick={() => navigate('/confirmedBets')}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Portfolio
          </button>
          <div className="bg-white space-x-3 rounded-lg p-2 flex items-center" onClick={handleModalOpen}>
            <img src={WalletLogo} alt="Wallet Logo" className="h-8" />
            <div className="flex items-center">
              <span className="ml-2 font-semibold text-black">
                ₹{walletBalance}
              </span>
              <img src={DownArrowIcon} alt="Down Arrow" className="h-4 ml-1" />
            </div>
          </div>
          <button
            onClick={() => navigate('/completedBets')}
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          >
            Results
          </button>
        </div>

        {/* Right Section */}
        <div className="relative flex items-center justify-end w-1/3">
          <h1 className="text-2xl">Mr. {userDetails['fullname']}! &nbsp;</h1>
          <img
            src={AccountLogo}
            alt="Account Logo"
            className="h-14 cursor-pointer"
            onClick={toggleDropdown} // Handle dropdown toggle on click
          />
        </div>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="right-2 absolute mt-36 w-48 bg-white rounded-lg shadow-lg z-50">
            <ul className="text-black">
              <li
                className="px-4 logoutTest py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Main Modal for deposit/withdraw options */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="Deposit / Withdraw"
        type="depositWithdraw"
        handleDepositModalOpen={handleDepositModalOpen}
        handleWithdrawModalOpen={handleWithdrawModalOpen} // Add this prop
      />

      {/* Deposit Modal to collect amount */}
      <Modal
        isOpen={depositModalOpen}
        onClose={handleDepositModalClose}
        title="Enter Deposit Amount"
        type="enterDepositAmount"
        depositAmount={depositAmount}
        setDepositAmount={setDepositAmount}
        handlePayment={handlePayment}
      />

      {/* Withdraw Modal to collect amount */}
      <Modal
        isOpen={withdrawModalOpen}
        onClose={handleWithdrawModalClose}
        title="Enter Withdraw Amount"
        type="enterWithdrawAmount"
        withdrawAmount={withdrawAmount}
        setWithdrawAmount={setWithdrawAmount}
        handleWithdraw={handleWithdraw} // Add this prop
      />

      {isModalWithdrawOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style={{ zIndex: 50 }}>
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm text-center relative" style={{ zIndex: 50 }}>
            <img
              src={refundImage} // Replace with your image URL
              alt="Confirmation Icon"
              className="w-34 h-32 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Withdraw Successful</h3>
            <p className="text-gray-600 mb-6">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="bg-gradient-to-r from-green-600 to-green-500 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-green-500 shadow-md transition-all duration-200"
            >
              Close
            </button>
            <div className="absolute top-1 right-3 cursor-pointer" onClick={closeModal}>
              <span className="text-gray-500 hover:text-gray-700 text-2xl">&times;</span>
            </div>
          </div>
        </div>
      )}

{loadingModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style={{ zIndex: 50 }}>
    <div className="bg-white p-10 rounded-lg shadow-2xl max-w-md text-center relative border border-gray-200" style={{ zIndex: 50 }}>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Processing Withdrawal</h3>
      <div className="flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent border-t-blue-500 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 text-sm">Please wait while we process your request.</p>
    </div>
  </div>
)}


    </>
  );
};

export default Header;
