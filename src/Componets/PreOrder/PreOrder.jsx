// src/pages/PreOrderPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import "./PreOrder.css";

const PreOrder = () => {
  const { id } = useParams(); // productId
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "COD",
  });

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (!userId) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const [userRes, productRes] = await Promise.all([
          axios.get(
            `https://restaurant-backend-uclq.onrender.com/user/${userId}`,
            {
              headers: { userId },
            }
          ),
          axios.get(
            `https://restaurant-backend-uclq.onrender.com/product/${id}`,
            {
              headers: { userId },
            }
          ),
        ]);
        setUser(userRes.data);
        setProduct(productRes.data.msg);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = Cookies.get("userId");

    try {
      const res = await axios.post(
        "https://restaurant-backend-uclq.onrender.com/orders",
        {
          restaurant: product.restaurantId || product.restaurant?._id,
          items: [{ product: product._id, quantity: 1, price: product.price }],
          totalAmount: product.price,
          deliveryAddress: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
          },
          status: "Pending",
          paymentMethod:
            formData.paymentMethod === "Card"
              ? "Credit Card"
              : "Cash on Delivery",
        },
        { headers: { userId } }
      );

      if (res.status === 201) {
        toast.success("Order placed successfully!");
        navigate("/orders");
      }
    } catch (err) {
      console.error("Order error:", err.response?.data || err.message);
      toast.error(err.response?.data?.msg || "Error placing order!");
    }
  };

  if (loading) return <LoadingAnimation />;

  return (
    <div>
      <Header user={user} />
      <div className="preorder-container">
        <h1>Pre-Order: {product?.name}</h1>
        <div className="preorder-content">
          <img
            src={product?.image}
            alt={product?.name}
            className="preorder-img"
          />
          <form className="preorder-form" onSubmit={handleSubmit}>
            <label>
              Street Address
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              City
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              State
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Zip Code
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Payment Method
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="COD">Cash on Delivery</option>
                <option value="Card">Credit/Debit Card</option>
              </select>
            </label>
            <button type="submit" className="confirm-btn">
              Confirm Order
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PreOrder;
