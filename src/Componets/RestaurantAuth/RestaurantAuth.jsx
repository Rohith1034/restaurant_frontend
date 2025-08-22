// RestaurantAuth.js - Main authentication component with toggle
import React, { useState } from 'react';
import RestaurantLogin from '../RestaurantLogin/RestaurantLogin';
import RestaurantSignup from '../RestaurantSignup/RestaurantSignup';
import './RestaurantAuth.css';

const RestaurantAuth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="restaurant-auth-container">
      <div className="restaurant-auth-card">
        <div className="auth-toggle">
          <button 
            className={isLogin ? 'active' : ''}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={!isLogin ? 'active' : ''}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>
        
        {isLogin ? <RestaurantLogin /> : <RestaurantSignup />}
      </div>
    </div>
  );
};

export default RestaurantAuth;