import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import Header from "../Header/Header";
import { CiDeliveryTruck } from "react-icons/ci";
import { GoChecklist } from "react-icons/go";
import RestaurantCard from "../Restaurant Card/RestaurantCard";
import PopularItemCard from "../Popular Items/PopularItemCard";
import Footer from "../Footer/Footer";
import { toast } from "react-toastify";
const ProductDetail = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [randomRestaurantData, setRandomRestaurantData] = useState([]);
  const [randomProductData, setRandomProductData] = useState([]);
  const navigate = useNavigate();
  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://restaurant-backend-uclq.onrender.com/${Cookies.get(
          "userId"
        )}/addTocart`,
        { productData },
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
  };

  const handleBuyNow = () => {
    navigate(`/preorder/${id}`);
  };

  useEffect(() => {
    const userId = Cookies.get("userId");

    const getProductData = async () => {
      try {
        const res = await axios.get(
          `https://restaurant-backend-uclq.onrender.com/product/${id}`,
          {
            headers: { userId: userId },
          }
        );
        if (res.status === 200) {
          setProductData(res.data.msg);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const getUserData = async () => {
      try {
        const res = await axios.get(
          `https://restaurant-backend-uclq.onrender.com/user/${userId}`,
          {
            headers: { userId: userId },
          }
        );
        setUser(res.data);
        setCartCount(res.data.orders?.length || 0);
      } catch (err) {
        console.log(err);
      }
    };

    const getRandomRestaurants = async () => {
      try {
        const res = await axios.get(
          "https://restaurant-backend-uclq.onrender.com/restaurants/random",
          {
            headers: { userId: userId },
          }
        );
        if (res.status === 200) {
          setRandomRestaurantData(res.data.msg || []);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const getRandomProducts = async () => {
      try {
        const res = await axios.post(
          "https://restaurant-backend-uclq.onrender.com/products/random",
          { count: 8 },
          { headers: { userId: userId } }
        );
        if (res.status === 200) {
          setRandomProductData(res.data.msg || []);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchData = async () => {
      try {
        await Promise.all([
          getUserData(),
          getProductData(),
          getRandomRestaurants(),
          getRandomProducts(),
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div>
          <Header user={user} cartCount={cartCount} />
          <div
            className="restaurant-content-contain"
            style={{
              backgroundImage: `url(${productData.image})`,
            }}
          >
            <div className="main-container">
              <div className="left-container">
                <h1 className="left-restaurant-name">{productData.name}</h1>
                <p className="left-restaurant-description">
                  {productData.description}
                </p>
                {/* Dietary Info */}
                <div className="dietary-info">
                  <span>
                    {productData.dietaryInfo?.vegetarian
                      ? "🟢 Vegetarian"
                      : "🔴 Non-Vegetarian"}
                  </span>
                  <span>
                    {productData.dietaryInfo?.vegan
                      ? "🌱 Vegan"
                      : "🌱 Not Vegan"}
                  </span>
                </div>

                {/* Ingredients */}
                {productData.ingredients?.length > 0 && (
                  <div className="ingredients-list">
                    <h4>Ingredients</h4>
                    <ul className="ingredients-list-container">
                      {productData.ingredients.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="info-buttons">
                  <button
                    className="left-info-buttons"
                    onClick={handleAddToCart}
                  >
                    <GoChecklist style={{ fontSize: "22px" }} />
                    Add To Cart
                  </button>
                  <button className="left-info-buttons" onClick={handleBuyNow}>
                    <CiDeliveryTruck
                      style={{ fontSize: "22px" }}
                    />
                    Buy now
                  </button>
                </div>
              </div>

              <div className="right-container">
                <img
                  className="right-container-restaurant-img"
                  src={productData.image}
                  alt={productData.name}
                />
                <div className="rating-badge" style={{ textAlign: "start" }}>
                  <span className="rating-score" style={{ marginLeft: "10px" }}>
                    ${productData.price}
                  </span>
                  <span
                    className="rating-stars"
                    style={{ fontSize: "14px", marginLeft: "10px" }}
                  >
                    PrepTime: {productData.preparationTime} min
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="all-products-container">
            <h2
              className="section-title"
              style={{
                textAlign: "start",
                justifyContent: "start",
                marginBottom: "20px",
              }}
            >
              Popular Restaurant
            </h2>
            <div className="restaurant-grid custom_class">
              {randomRestaurantData.map((product, index) => (
                <RestaurantCard key={product._id} restaurant={product} />
              ))}
            </div>
          </div>
          <div className="all-products-container">
            <h2
              className="section-title"
              style={{
                textAlign: "start",
                justifyContent: "start",
                marginBottom: "20px",
              }}
            >
              Similar Products
            </h2>
            <div className="restaurant-grid custom_class">
              {randomProductData.map((product, index) => (
                <PopularItemCard key={product._id} item={product} />
              ))}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
