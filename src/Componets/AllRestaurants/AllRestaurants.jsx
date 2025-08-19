import React, { useEffect, useState } from "react";
import "./AllRestaurants.css";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import Categories from "../Categories/Categories";
import RestaurantCard from "../Restaurant Card/RestaurantCard";
import Footer from "../Footer/Footer";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
const AllRestaurants = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState({});
  const [restaurants, setRestaurants] = useState([]);
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

    const getAllRestaurantData = async () => {
      try {
        const res = await axios.get("https://restaurant-backend-uclq.onrender.com/getAllRestaurants", {
          headers: {
            userId: userId,
          },
        });
        if (res.status === 200) {
          setRestaurants(res.data.msg);
        }
      } catch (err) {
        if (err.response && err.response.status === 500) {
          toast.error("Server error please try again!");
        }
      }
    };

    const fetchData = async () => {
      try {
        await Promise.all([getUserData(), getAllRestaurantData()]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <LoadingAnimation />
  ) : (
    <div>
      <Header cartCount={cartCount} user={user} />
      <Categories />
      <section className="all-restaurants-container">
        <div className="section-header">
          <h2 className="section-title">Popular Restaurants</h2>
        </div>

        <div className="restaurant-grid">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AllRestaurants;
