// src/pages/OrdersPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FaClock, FaCheckCircle } from "react-icons/fa";
import "./OrdersPage.css";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        // 1️⃣ Fetch the user to get order IDs
        const userRes = await axios.get(
          `https://restaurant-backend-uclq.onrender.com/users/${userId}`
        );

        const orderIds = userRes.data?.orders || [];

        // 2️⃣ Fetch each order detail using your /orders/:orderId route
        const orderPromises = orderIds.map((id) =>
          axios.get(
            `https://restaurant-backend-uclq.onrender.com/orders/${id}`,
            { headers: { userId } }
          )
        );

        const results = await Promise.all(orderPromises);

        // 3️⃣ Extract `order` from each response
        const fullOrders = results.map((res) => res.data.order);

        setOrders(fullOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <LoadingAnimation />;

  return (
    /*
    <div className="order-history">
      <div className="section-header">
        <h2 className="section-title">My Orders</h2>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <div className="empty-icon">
            <FaClock />
          </div>
          <h3>No Orders Yet</h3>
          <p>You haven't placed any orders. Start ordering now!</p>
          <button className="order-button">Browse Restaurants</button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-id">Order #{order._id.slice(-6)}</div>
                <div className="order-date">
                  {new Date(order.orderDate).toLocaleDateString()}
                </div>
                <div className={`order-status ${order.status.toLowerCase()}`}>
                  <FaCheckCircle /> {order.status}
                </div>
              </div>

              
              <div className="order-restaurant">
                {order.restaurant?.name || order.restaurant}
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-name">
                      {item.quantity}x {item.product?.name || "Product"}
                    </div>
                    <div className="item-price">
                      ${(item.quantity * item.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="total-label">Total</div>
                <div className="total-price">
                  ${order.totalAmount.toFixed(2)}
                </div>
              </div>

              <button className="reorder-button">Reorder</button>
            </div>
          ))}
            
        </div>
      )}
    </div>
    */
   <div></div>
  );
};

export default OrdersPage;
