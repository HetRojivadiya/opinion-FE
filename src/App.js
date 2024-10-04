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
import CompletedBets from './components/Results/completedBets.js';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    navigate('/home');
  };

  const isAuthPage = location.pathname === "/";

  return (
    <div style={styles.appContainer}>
      {!isAuthPage && <Header />}
      
      <main style={styles.content}>
        <Routes>
          <Route path="/" element={<AuthForm onLogin={handleLogin} />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/confirmedBets" element={<ConfirmedBets />} />
          <Route path="/completedBets" element={<CompletedBets />} />
          <Route path="/payment-successful" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      
      {!isAuthPage && <Footer />}
    </div>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // Ensures full viewport height
  },
  content: {
    flex: 1, // This makes the content area expand to fill available space
  },
};

export default App;