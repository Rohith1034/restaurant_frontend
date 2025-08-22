// RestaurantDetails.js
import React, { useState, useEffect } from 'react';

const RestaurantDetails = ({ restaurant, onUpdate }) => {
  const [formData, setFormData] = useState({
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
      zipCode: '',
    },
    openingHours: {
      Monday: '',
      Tuesday: '',
      Wednesday: '',
      Thursday: '',
      Friday: '',
      Saturday: '',
      Sunday: '',
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name || '',
        description: restaurant.description || '',
        cuisineType: restaurant.cuisineType || '',
        deliveryTime: restaurant.deliveryTime || '',
        image: restaurant.image || '',
        bannerImage: restaurant.bannerImage || '',
        address: {
          street: restaurant.address?.street || '',
          city: restaurant.address?.city || '',
          state: restaurant.address?.state || '',
          zipCode: restaurant.address?.zipCode || '',
        },
        openingHours: {
          Monday: restaurant.openingHours?.Monday || '',
          Tuesday: restaurant.openingHours?.Tuesday || '',
          Wednesday: restaurant.openingHours?.Wednesday || '',
          Thursday: restaurant.openingHours?.Thursday || '',
          Friday: restaurant.openingHours?.Friday || '',
          Saturday: restaurant.openingHours?.Saturday || '',
          Sunday: restaurant.openingHours?.Sunday || '',
        }
      });
    }
  }, [restaurant]);

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
    
    try {
      const restaurantId = localStorage.getItem('restaurantId');
      const response = await fetch(`http://localhost:5000/api/restaurant/${restaurantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      
      if (response.ok) {
        const updatedRestaurant = await response.json();
        setMessage('Restaurant details updated successfully!');
        setIsEditing(false);
        if (onUpdate) {
          onUpdate(updatedRestaurant);
        }
        
        // Clear success message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to update restaurant details');
      }
    } catch (error) {
      console.error('Update error:', error);
      setMessage('Network error. Please try again.');
    }
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  if (!restaurant) {
    return <div className="loading">Loading restaurant details...</div>;
  }

  return (
    <div className="restaurant-details">
      <div className="details-header">
        <h2>Restaurant Details</h2>
        {!isEditing && (
          <button 
            className="edit-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit Details
          </button>
        )}
      </div>

      {message && (
        <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="details-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Restaurant Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={!isEditing}
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
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={!isEditing}
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="deliveryTime">Delivery Time</label>
              <input
                type="text"
                id="deliveryTime"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleChange}
                required
                disabled={!isEditing}
                placeholder="e.g., 25-30 min"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Images</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                disabled={!isEditing}
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
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Address</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="street">Street</label>
              <input
                type="text"
                id="street"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                disabled={!isEditing}
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
                disabled={!isEditing}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                disabled={!isEditing}
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
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Opening Hours</h3>
          <div className="opening-hours-grid">
            {daysOfWeek.map(day => (
              <div key={day} className="form-group">
                <label htmlFor={day}>{day}</label>
                <input
                  type="text"
                  id={day}
                  name={`openingHours.${day}`}
                  value={formData.openingHours[day]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="e.g., 9:00 AM - 10:00 PM"
                />
              </div>
            ))}
          </div>
        </div>

        {isEditing && (
          <div className="form-actions">
            <button type="submit" className="save-btn">
              Save Changes
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => {
                setIsEditing(false);
                // Reset form data to original values
                setFormData({
                  name: restaurant.name || '',
                  description: restaurant.description || '',
                  cuisineType: restaurant.cuisineType || '',
                  deliveryTime: restaurant.deliveryTime || '',
                  image: restaurant.image || '',
                  bannerImage: restaurant.bannerImage || '',
                  address: {
                    street: restaurant.address?.street || '',
                    city: restaurant.address?.city || '',
                    state: restaurant.address?.state || '',
                    zipCode: restaurant.address?.zipCode || '',
                  },
                  openingHours: {
                    Monday: restaurant.openingHours?.Monday || '',
                    Tuesday: restaurant.openingHours?.Tuesday || '',
                    Wednesday: restaurant.openingHours?.Wednesday || '',
                    Thursday: restaurant.openingHours?.Thursday || '',
                    Friday: restaurant.openingHours?.Friday || '',
                    Saturday: restaurant.openingHours?.Saturday || '',
                    Sunday: restaurant.openingHours?.Sunday || '',
                  }
                });
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default RestaurantDetails;