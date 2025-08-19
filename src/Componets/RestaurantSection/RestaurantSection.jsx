// src/components/RestaurantSection.js
import React, { useEffect, useState } from "react";
import RestaurantCard from "../Restaurant Card/RestaurantCard";
import { FaArrowRight } from "react-icons/fa";
import "./RestaurantSection.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const RestaurantSection = ({ addToCart }) => {
  const [restaurants, setRestaurants] = useState([]);
  const userID = Cookies.get("userId");

  useEffect(() => {
    const getAllRestaurants = async () => {
      try {
        const res = await axios.get(
          "https://restaurant-backend-uclq.onrender.com/restaurants/random",
          {
            headers: {
              userId: userID,
            },
          }
        );
        if (res.status === 200) {
          setRestaurants(res.data.msg);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getAllRestaurants();
  }, [userID]); // Added dependency to avoid stale userId

  return (
    <section className="restaurant-section">
      <div className="section-header">
        <h2 className="section-title">Popular Restaurants</h2>
        <Link to="/allRestaurants" className="view-all">
          View All <FaArrowRight />
        </Link>
      </div>

      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            restaurant={restaurant}
            addToCart={addToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default RestaurantSection;
