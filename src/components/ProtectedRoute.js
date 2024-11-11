// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin }) => {
  if (!isAdmin) {
    // If not admin, redirect to the home page
    return <Navigate to="/home" replace />;
  }

  // If admin, render the child components
  return children;
};

export default ProtectedRoute;
