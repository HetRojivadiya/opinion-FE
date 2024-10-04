import React from 'react';
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import AuthForm from './components/Authentication/AuthForm.js';
import AboutPage from './components/HomePage/AboutPage.js';
import ConfirmedBets from './components/Portfolio/confirmedBets.js';

import PaymentSuccess from './components/Payment/PaymentSuccess.jsx';
import PaymentFailed from './components/Payment/PaymentFailed.jsx';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    navigate('/home'); 
  };

  const isAuthPage = location.pathname === "/";


  return (
    <div className="App">
      {!isAuthPage && <Header />}
     
      <Routes>
        <Route path="/" element={<AuthForm onLogin={handleLogin} />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/confirmedBets" element={<ConfirmedBets />} />

        <Route path="/payment-successful" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/payment-successful" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
      </Routes>
     
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default App;
