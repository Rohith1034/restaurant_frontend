// src/components/AuthPage.js
import React, { useState } from 'react';
import SignIn from '../Login/SignIn';
import SignUp from '../SignUp/SignUp';
import './AuthPage.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const userId = Cookies.get("userId");
  const navigate = useNavigate();
  if (userId != "" || userId != undefined) {
    navigate("/dashboard");
  }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-tabs">
          <button 
            className={`tab-btn ${activeTab === 'signin' ? 'active' : ''}`}
            onClick={() => setActiveTab('signin')}
          >
            Sign In
          </button>
          <button 
            className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Create Account
          </button>
        </div>
        
        <div className="auth-content">
          {activeTab === 'signin' ? <SignIn /> : <SignUp />}
        </div>
        
        <div className="auth-footer">
          {activeTab === 'signin' ? (
            <p>Don't have an account? <button onClick={() => setActiveTab('signup')}>Sign Up</button></p>
          ) : (
            <p>Already have an account? <button onClick={() => setActiveTab('signin')}>Sign In</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;