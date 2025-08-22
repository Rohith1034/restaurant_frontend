// RestaurantAuthWrapper.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RestaurantAuth from '../RestaurantAuth/RestaurantAuth';
import RestaurantDashboard from '../RestaurantDashboard/RestaurantDashboard';

const RestaurantAuthWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if restaurant is already authenticated
    const checkAuthStatus = async () => {
      try {
        const restaurantId = localStorage.getItem('restaurantId');
        if (!restaurantId) {
          setLoading(false);
          return;
        }
        
        // Verify with backend if the restaurant session is still valid
        const response = await fetch(`http://localhost:5000/api/restaurant/verify/${restaurantId}`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('restaurantId');
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        localStorage.removeItem('restaurantId');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = (restaurantId) => {
    localStorage.setItem('restaurantId', restaurantId);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('restaurantId');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Checking authentication status...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="login" 
        element={
          isAuthenticated ? 
          <Navigate to="/restaurants/dashboard" replace /> : 
          <RestaurantAuth onLogin={handleLogin} />
        } 
      />
      <Route 
        path="dashboard/*" 
        element={
          isAuthenticated ? 
          <RestaurantDashboard onLogout={handleLogout} /> : 
          <Navigate to="/restaurants/auth" replace />
        } 
      />
      <Route 
        path="/" 
        element={
          <Navigate to={isAuthenticated ? "/restaurants/dashboard" : "/restaurants/login"} replace />
        } 
      />
    </Routes>
  );
};

export default RestaurantAuthWrapper;