// src/components/PopularItems.js
import React, { useEffect, useState } from "react";
import PopularItemCard from "./PopularItemCard";
import { FaArrowRight } from "react-icons/fa";
import "./PopularItems.css";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";

const PopularItems = ({ addToCart }) => {
  const [popularItems, setPopularItems] = useState([]);
  const userId = Cookies.get("userId");
  useEffect(() => {
    const getAllRestaurants = async () => {
      try {
        const res = await axios.post("https://restaurant-backend-uclq.onrender.com/products/random",{
          count:12
        },{
          headers: {
            userId: userId,
          },
        });

        if (res.status === 200) {
          setPopularItems(res.data.msg);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getAllRestaurants();
  }, []);

  return (
    <section className="popular-items">
      <div className="section-header">
        <h2 className="section-title">Popular Dishes</h2>
        <Link to="/allProducts" className="view-all">
          View All <FaArrowRight />
        </Link>
      </div>

      <div className="items-grid">
        {popularItems.map((item) => (
          <PopularItemCard key={item._id} item={item} addToCart={addToCart} />
        ))}
      </div>
    </section>
  );
};

export default PopularItems;
