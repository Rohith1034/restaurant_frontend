// src/components/profile/ProfileHeader.js
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import './ProfileHeader.css';

const ProfileHeader = ({ user }) => {
  return (
    <div className="profile-header">
      <div className="header-content">
        <div className="user-info">
          <div className="avatar">
            {user.profileImage ? (
              <img src={user.profileImage} alt={user.name} />
            ) : (
              <div className="avatar-initials">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
          <div className="user-details">
            <h1 className="user-name">{user.name}</h1>
            <p className="user-email">{user.email}</p>
          </div>
        </div>
        <div className="stats">
          <div className="stat-item">
            <div className="stat-value">{user.orders?.length || 0}</div>
            <div className="stat-label">Orders</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">4.8</div>
            <div className="stat-label">Rating</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{user.addresses.length}</div>
            <div className="stat-label">Addresses</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;