import React, { useState, useEffect } from "react";
import WalletLogo from "../../assets/Header/wallte.png";
import AccountLogo from "../../assets/Header/account.png";
import DownArrowIcon from "../../assets/Header/down-arrow.png";
import CompanyLogo from "../../assets/Logo/logo.jpg";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Modal from "../Header/Modal"; // Modal Component

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [userDetails, setUserDetails] = useState({
    fullname:'',
    email: '',
    mobile: '',
  });
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user details when component is mounted
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
    
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/checkToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        if (response.ok) {
          const detailsResponse = await fetch(
            "http://localhost:3001/getUserDetails",
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

          console.log(details);

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

  // Handle payment process
  const handlePayment = async () => {
    const data = {
      name: `${userDetails.fullname}`,
      email: userDetails.email,
      amount: depositAmount,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/payment/create-order",
        data
      );
      console.log(response.data);
      window.location.href = response.data.url;
    } catch (error) {
      console.log("error in payment", error);
    }
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
          <img src={CompanyLogo} alt="Company Logo" className="h-16" />
          <h1 className="text-2xl md:text-2xl lg:text-3xl ml-2 hide-on-small">
            Opinion
          </h1>
        </div>

        {/* Center Section */}
        <div
          className="flex items-center justify-center w-1/3 cursor-pointer"
          onClick={handleModalOpen}
        >
          <div className="bg-white space-x-3 rounded-lg p-2 flex items-center">
            <img src={WalletLogo} alt="Wallet Logo" className="h-8" />
            <div className="flex items-center">
              <span className="ml-2 font-semibold text-black">
                ₹{walletBalance}
              </span>
              <img src={DownArrowIcon} alt="Down Arrow" className="h-4 ml-1" />
            </div>
          </div>
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
            <div className="right-2 absolute mt-36  w-48 bg-white rounded-lg shadow-lg z-50">
              <ul className="text-black">
                <li
                  className="px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => navigate('/profile')}
                >
                  Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
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
    </>
  );
};

export default Header;
