// src/components/RestaurantCard.js
import React from "react";
import { FaStar, FaClock, FaFire } from "react-icons/fa";
import "./RestaurantCard.css";
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ restaurant, addToCart }) => {
  const navigate = useNavigate();
  const handleNavigate = (e) => {
    e.preventDefault();
    navigate(`/restaurant/${restaurant._id}`);
  };
  const renderRatingStars = () => {
    return (
      <FaStar className={Math.floor(restaurant.rating) >= 1 ? "filled" : ""} />
    );
  };

  return (
    <div
      className={`restaurant-card ${restaurant.featured ? "featured" : ""}`}
      onClick={handleNavigate}
    >
      {restaurant.featured && (
        <div className="featured-badge">
          <FaFire /> Featured
        </div>
      )}
      <div className="card-image">
        <img src={restaurant.image} alt={restaurant.name} />
      </div>
      <div className="card-content">
        <div className="card-header">
          <h3 className="restaurant-name">{restaurant.name}</h3>
          <div className="rating">
            {renderRatingStars()}
            <span className="rating-value">{restaurant.rating}</span>
            <span className="review-count">({restaurant.reviewCount})</span>
          </div>
        </div>

        <div className="cuisine">{restaurant.cuisine}</div>

        <div className="delivery-time">
          <FaClock /> {restaurant.deliveryTime}
        </div>

        <button className="order-button" onClick={() => addToCart(restaurant)}>
          Order Now
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
