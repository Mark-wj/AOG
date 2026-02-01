import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated
  const token = localStorage.getItem('adminToken');
  const adminUser = localStorage.getItem('adminUser');

  // If no token or admin user data, redirect to login
  if (!token || !adminUser) {
    console.log('🚫 Access denied - redirecting to login');
    return <Navigate to="/admin/login" replace />;
  }

  // User is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;