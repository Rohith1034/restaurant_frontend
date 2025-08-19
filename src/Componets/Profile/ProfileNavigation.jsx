// src/components/profile/ProfileNavigation.js
import React from 'react';
import './ProfileNavigation.css';

const ProfileNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'address', label: 'My Addresses' },
    { id: 'orders', label: 'Order History' },
    { id: 'payments', label: 'Payment Methods' },
  ];

  return (
    <div className="profile-nav">
      <div className="nav-card">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && <div className="indicator" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileNavigation;