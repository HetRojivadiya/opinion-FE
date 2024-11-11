// src/components/UserOnlyRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const UserOnlyRoute = ({ children, isAdmin }) => {
  if (isAdmin) {
    // Redirect admin users to the admin dashboard
    return <Navigate to="/admin" replace />;
  }

  // Allow access to regular users
  return children;
};

export default UserOnlyRoute;
