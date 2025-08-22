// RestaurantSignup.js - Signup component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../RestaurantAuth/RestaurantAuth.css';

const RestaurantSignup = () => {
  const [formData, setFormData] = useState({
    // Owner credentials
    email: '',
    password: '',
    confirmPassword: '',
    
    // Restaurant details
    name: '',
    description: '',
    cuisineType: '',
    deliveryTime: '',
    image: '',
    bannerImage: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    openingHours: {
      Monday: '',
      Tuesday: '',
      Wednesday: '',
      Thursday: '',
      Friday: '',
      Saturday: '',
      Sunday: ''
    }
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Check if it's a nested field (address or openingHours)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/restaurant/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('restaurantId', data.restaurantId);
        navigate('/restaurant/dashboard');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      
      <h3>Owner Information</h3>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      
      <h3>Restaurant Details</h3>
      <div className="form-group">
        <label htmlFor="name">Restaurant Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="cuisineType">Cuisine Type</label>
        <input
          type="text"
          id="cuisineType"
          name="cuisineType"
          value={formData.cuisineType}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="deliveryTime">Delivery Time (e.g., 25-30 min)</label>
        <input
          type="text"
          id="deliveryTime"
          name="deliveryTime"
          value={formData.deliveryTime}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="bannerImage">Banner Image URL</label>
        <input
          type="text"
          id="bannerImage"
          name="bannerImage"
          value={formData.bannerImage}
          onChange={handleChange}
        />
      </div>
      
      <h4>Address</h4>
      <div className="form-group">
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          name="address.street"
          value={formData.address.street}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="address.city"
          value={formData.address.city}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          name="address.state"
          value={formData.address.state}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="zipCode">Zip Code</label>
        <input
          type="text"
          id="zipCode"
          name="address.zipCode"
          value={formData.address.zipCode}
          onChange={handleChange}
        />
      </div>
      
      <h4>Opening Hours</h4>
      {Object.keys(formData.openingHours).map(day => (
        <div className="form-group" key={day}>
          <label htmlFor={day}>{day}</label>
          <input
            type="text"
            id={day}
            name={`openingHours.${day}`}
            value={formData.openingHours[day]}
            onChange={handleChange}
            placeholder="e.g., 9:00 AM - 10:00 PM"
          />
        </div>
      ))}
      
      <button type="submit" className="auth-button">Create Restaurant</button>
    </form>
  );
};

export default RestaurantSignup;