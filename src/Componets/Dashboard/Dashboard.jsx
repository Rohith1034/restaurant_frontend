// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import RestaurantSection from "../RestaurantSection/RestaurantSection";
import PopularItems from "../Popular Items/PopularItems";
import Footer from "../Footer/Footer";
import "./Dashboard.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(3);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = Cookies.get("userId");

    if (!userId) {
      navigate("/");
      return;
    }

    const getUserData = async () => {
      try {
        const res = await axios.get(`https://restaurant-backend-uclq.onrender.com/user/${userId}`, {
          headers: {
            userId: userId,
          },
        });
        setUser(res.data);
        setCartCount(res.data.orders.length);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          toast.error("User not found!");
        }
      }
    };

    getUserData();
    setLoading(false);
  });

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return loading ? (
    <LoadingAnimation />
  ) : (
    <div className="dashboard">
      <Header cartCount={cartCount} user={user} />
      <Hero />
      <RestaurantSection addToCart={addToCart} />
      <PopularItems addToCart={addToCart} />
      <Footer />
    </div>
  );
};

export default Dashboard;
