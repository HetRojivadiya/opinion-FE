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

// admin
import GetAllCategories from './components/Admin/GetAllCategories.js';
import SeeSpecificSport from './components/Admin/SeeSpecificSport.js';
import CurrentContest from './components/Admin/CurrentContest.js';
import CompletedContests from './components/Admin/CompletedContest.js';
import ManageUsers from './components/Admin/ManageUsers.js';
import AdminHomePage from './components/Admin/AdminHomePage.js';

// Protected Route components
import ProtectedRoute from './components/ProtectedRoute';
import UserOnlyRoute from './components/UserOnlyRoute';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle login function
  const handleLogin = (token, targetPage) => {
    localStorage.setItem("token", token);

    // Set isAdmin flag in localStorage based on the target page
    if (targetPage === "/admin") {
      localStorage.setItem("isAdmin", true);
    } else {
      localStorage.setItem("isAdmin", false);
    }

    navigate(targetPage);
  };

  const isAuthPage = location.pathname === "/";
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <div style={styles.appContainer}>
      {!isAuthPage && <Header />}
      
      <main style={styles.content}>
        <Routes>
          <Route path="/" element={<AuthForm onLogin={handleLogin} />} />

          {/* Non-admin (user-only) routes */}
          <Route
            path="/home"
            element={
              <UserOnlyRoute isAdmin={isAdmin}>
                <HomePage />
              </UserOnlyRoute>
            }
          />
          <Route
            path="/confirmedBets"
            element={
              <UserOnlyRoute isAdmin={isAdmin}>
                <ConfirmedBets />
              </UserOnlyRoute>
            }
          />
          <Route
            path="/completedBets"
            element={
              <UserOnlyRoute isAdmin={isAdmin}>
                <CompletedBets />
              </UserOnlyRoute>
            }
          />
          <Route
            path="/payment-successful"
            element={
              <UserOnlyRoute isAdmin={isAdmin}>
                <PaymentSuccess />
              </UserOnlyRoute>
            }
          />
          <Route
            path="/payment-failed"
            element={
              <UserOnlyRoute isAdmin={isAdmin}>
                <PaymentFailed />
              </UserOnlyRoute>
            }
          />
          <Route
            path="/about"
            element={
              <UserOnlyRoute isAdmin={isAdmin}>
                <AboutPage />
              </UserOnlyRoute>
            }
          />

          {/* Admin-only routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAdmin={isAdmin}>
                <AdminHomePage />
              </ProtectedRoute>
            }
          >
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
    minHeight: '100vh',
  },
  content: {
    flex: 1,
  },
};

export default App;
