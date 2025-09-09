// src/components/PopularItemCard.js
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import './PopularItemCard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const PopularItemCard = ({ item, addToCart }) => {
  const navigate = useNavigate();
  const handleRoute = (e) => {
    e.preventDefault();
    navigate(`/product/${item._id}`);
  }

  const handleAddToCart = async(e) => {
    e.stopPropagation();
    try {
      const res = await axios.post(
        `https://restaurant-backend-uclq.onrender.com/${Cookies.get("userId")}/addTocart`,
        { productData: item },
        {
          headers: { userId: Cookies.get("userId") },
        }
      );
      if (res.status === 200) {
        toast.success("Item added to cart successfull");
      }
    } catch (err) {
      toast.error("Error adding item to cart!");
    }
  }

  return (
    <div className="item-card" onClick={handleRoute}>
      <div className="item-image">
        <img src={item.image} alt={item.name} />
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
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