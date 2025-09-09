// RestaurantDashboard.js - Updated
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductManagement from '../ProductManagement/ProductManagement';
import RestaurantDetails from '../RestaurantDetail/RestaurantDetail'; // Import the new component
import './RestaurantDashboard.css';

const RestaurantDashboard = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const restaurantId = localStorage.getItem('restaurantId');
        if (!restaurantId) {
          navigate('/restaurants/login');
          return;
        }
        
        const response = await fetch(`https://restaurant-backend-uclq.onrender.com/api/restaurant/${restaurantId}`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setRestaurant(data);
        } else {
          navigate('/restaurant/login');
        }
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };
    
    fetchRestaurantData();
  }, [navigate]);
  
  const handleLogout = async () => {
    try {
      await fetch('https://restaurant-backend-uclq.onrender.com/api/restaurant/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('restaurantId');
      navigate('/restaurants/login');
    }
  };

  const handleRestaurantUpdate = (updatedRestaurant) => {
    setRestaurant(updatedRestaurant);
  };
  
  if (!restaurant) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className="restaurant-dashboard">
      <header className="dashboard-header">
        <h1>{restaurant.name} - Owner Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>
      
      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          Product Management
        </button>
        <button 
          className={activeTab === 'details' ? 'active' : ''}
          onClick={() => setActiveTab('details')}
        >
          Restaurant Details
        </button>
        <button 
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'products' && <ProductManagement restaurantId={restaurant._id} name = {restaurant.name}/>}
        {activeTab === 'details' && (
          <RestaurantDetails 
            restaurant={restaurant} 
            onUpdate={handleRestaurantUpdate}
          />
        )}
        {activeTab === 'orders' && <div>Order Management (to be implemented)</div>}
      </div>
    </div>
  );
};

export default RestaurantDashboard;