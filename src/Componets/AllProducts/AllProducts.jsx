import React, { useEffect, useState } from "react";
import "./AllProducts.css";
import Header from "../Header/Header";
import Cookies from "js-cookie";
import axios from "axios";
import Footer from "../Footer/Footer";
import Categories from "../Categories/Categories";
import RestaurantProduct from "../RestaurantProducts/RestaurantProducts";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
const AllProducts = () => {
  const userId = Cookies.get("userId");
  const [user, setUser] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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
          console.log(err);
        }
      }
    };

    const fetchData = async() => {
      await getUserData();
      setLoading(false);
    }

    
    fetchData();
  });
  return loading ? (
    <LoadingAnimation />
  ) : (
    <div>
      <Header user={user} cartCount={cartCount} />
      <Categories />
      <RestaurantProduct />
      <Footer />
    </div>
  );
};

export default AllProducts;
