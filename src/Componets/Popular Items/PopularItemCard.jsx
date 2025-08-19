// src/components/PopularItemCard.js
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import './PopularItemCard.css';
import { useNavigate } from 'react-router-dom';

const PopularItemCard = ({ item, addToCart }) => {
  const navigate = useNavigate();
  const handleRoute = (e) => {
    e.preventDefault();
    navigate(`/product/${item._id}`);
  }

  return (
    <div className="item-card" onClick={handleRoute}>
      <div className="item-image">
        <img src={item.image} alt={item.name} />
        <button 
          className="add-to-cart-btn"
          onClick={() => addToCart(item)}
        >
          <FaPlus />
        </button>
      </div>
      <div className="item-info">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-description">{item.description}</p>
        <div className="item-footer">
          <div className="price">${item.price.toFixed(2)}</div>
          <div className="restaurant">{item.restaurant}</div>
        </div>
      </div>
    </div>
  );
};

export default PopularItemCard;