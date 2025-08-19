// src/pages/CartPage.js
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Cart.css";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
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
        setCartItems(res.data.cart);
        setCartCount(res.data.orders.length);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          toast.error("User not found!");
        }
      }
    };

    const fetchData = async () => {
      getUserData();
      setLoading(false);
    };

    fetchData();
  }, [navigate]);

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`https://restaurant-backend-uclq.onrender.com/cart/${id}`, {
        headers: { userId: Cookies.get("userId") },
      });
      setCartItems((prev) => prev.filter((item) => item._id !== id));
      setCartCount((prev) => prev - 1);
      toast.success("Item removed!");
    } catch (err) {
      toast.error("Error removing item!");
    }
  };

  const checkout = () => {
    toast.success("Proceeding to checkout!");
    // navigate("/checkout");
  };

  if (loading) return <LoadingAnimation />;

  return (
    <div className="cart-page">
      <Header cartCount={cartCount} user={user} />

      <div className="cart-container">
        <h1>Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <div className="cart-actions">
            <h2>
              Total: $
              {cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            </h2>
            <button className="checkout-btn" onClick={checkout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
