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

//admin
import GetAllCategories from './components/Admin/GetAllCategories.js';
import SeeSpecificSport from './components/Admin/SeeSpecificSport.js';
import CurrentContest from './components/Admin/CurrentContest.js';
import CompletedContests from './components/Admin/CompletedContest.js';
import ManageUsers from './components/Admin/ManageUsers.js';
import AdminHomePage from './components/Admin/AdminHomePage.js';

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

          
          {/* <Route path="/admin/seeAllCategories" element={<GetAllCategories />}/>
          <Route path="/admin/seeSpecificSport/:key" element={<SeeSpecificSport />} />
          <Route path="/admin/seeLiveContest" element={<CurrentContest />} />
          <Route path="/admin/seeCompletedContest" element={<CompletedContests />} />
          <Route path="/admin/manageUsers" element={<ManageUsers />} /> */}

            <Route path="/admin" element={<AdminHomePage />}>
          <Route path="seeAllCategories" element={<GetAllCategories />} />
          <Route path="seeSpecificSport/:key" element={<SeeSpecificSport />} />
          <Route path="seeLiveContest" element={<CurrentContest />} />
          <Route path="seeCompletedContest" element={<CompletedContests />} />
          <Route path="manageUsers" element={<ManageUsers />} />
        </Route>
          
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