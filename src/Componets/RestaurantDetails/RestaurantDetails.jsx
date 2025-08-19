import React, { useEffect, useState } from "react";
import "./RestaurantDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../Header/Header";
import { CiDeliveryTruck } from "react-icons/ci";
import { GoChecklist } from "react-icons/go";
import RestaurantProducts from "../RestaurantProducts/RestaurantProducts";
const RestaurantDetails = () => {
  const { id } = useParams();
  const userId = Cookies.get("userId");
  const [user, setUser] = useState({});
  const [restaurantData, setRestaurantData] = useState({});
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`https://restaurant-backend-uclq.onrender.com/restaurant/${id}`, {
        headers: { userId },
      });
      if (res.status === 200) {
        setRestaurantData(res.data.msg);
      }
    };

    const getUserData = async () => {
      try {
        const res = await axios.get(`https://restaurant-backend-uclq.onrender.com/user/${userId}`, {
          headers: { userId },
        });
        setUser(res.data);
        setCartCount(res.data.orders.length);
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
    getData();
  }, [id, userId]);

  return (
    <div>
      <Header user={user} cartCount={cartCount} />
      <div
        className="restaurant-content-contain"
        style={{
          backgroundImage: `url(${restaurantData.bannerImage})`,
        }}
      >
        <div className="main-container">
          <div className="left-container">
            <h1 className="left-restaurant-name">{restaurantData.name}</h1>
            <p className="left-restaurant-description">
              {restaurantData.description}
            </p>
            <div className="info-buttons">
              <button className="left-info-buttons">
                <GoChecklist style={{ fontSize: "22px" }} />
                Minimum Order: 12 GBP
              </button>
              <button className="left-info-buttons">
                <CiDeliveryTruck style={{ fontSize: "22px" }} />
                Delivery in {restaurantData.deliveryTime}
              </button>
            </div>
          </div>

          <div className="right-container">
            <img
              className="right-container-restaurant-img"
              src={restaurantData.image}
              alt={restaurantData.name}
            />
            <div className="rating-badge">
              <span className="rating-score">{restaurantData.rating}</span>
              <span className="rating-stars">★★★★★</span>
              <span className="rating-reviews">
                {restaurantData.reviewCount} reviews
              </span>
            </div>
          </div>
        </div>
      </div>
      <RestaurantProducts />
    </div>
  );
};

export default RestaurantDetails;
