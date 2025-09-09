// src/pages/Profile.js
import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileNavigation from './ProfileNavigation';
import PersonalInfo from './PersonalInfo';
import AddressSection from './AddressSection';
import OrderHistory from './OrderHistory';
import PaymentMethods from './PaymentMethods';
import './Profile.css';
import { useLocation } from "react-router-dom";
import Header from '../Header/Header';
import Footer from "../Footer/Footer"
const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [editMode, setEditMode] = useState(false);
  const location = useLocation();
  const user = location.state?.user;

  console.log(user);
  
  return (
    <div className="profile-page">
      <div style={{marginBottom: "20px"}}>
        <Header user={user}></Header>
      </div>
      
      <ProfileHeader user={user} />
      
      <div className="profile-container">
        <ProfileNavigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        
        <div className="profile-content">
          {activeTab === 'personal' && (
            <PersonalInfo 
              user={user} 
              editMode={editMode} 
              setEditMode={setEditMode} 
            />
          )}
          
          {activeTab === 'address' && (
            <AddressSection 
              addresses={user.addresses} 
              editMode={editMode} 
              setEditMode={setEditMode} 
            />
          )}
          
          {activeTab === 'orders' && (
            <OrderHistory orders={user.orders} />
          )}
          
          {activeTab === 'payments' && (
            <PaymentMethods payments={user.paymentMethods} />
          )}
        </div>
      </div>
      <div style={{marginTop: "40px", marginBottom:"0"}}>
          <Footer />
      </div>
      
    </div>
  );
};

export default Profile;