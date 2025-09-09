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
        // Use the /orders endpoint that returns all orders for a user
        const response = await axios.get(
          `https://restaurant-backend-uclq.onrender.com/orders`,
          { headers: { userId } }
        );

        // Get the latest 6 orders (already sorted by date from backend)
        const latestOrders = response.data.orders ? response.data.orders.slice(0, 6) : [];
        setOrders(latestOrders);
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
          {orders.map((order, index) => {
            // Safe access to order properties
            const orderId = order?._id || `temp-${index}`;
            const orderDate = order?.orderDate ? new Date(order.orderDate).toLocaleDateString() : "Unknown Date";
            const status = order?.status || "Pending";
            const restaurantName = order?.restaurant?.name || order?.restaurant || "Unknown Restaurant";
            const totalAmount = order?.totalAmount ? order.totalAmount.toFixed(2) : "0.00";

            return (
              <div key={orderId} className="order-card">
                <div className="order-header">
                  <div className="order-id">
                    Order #{orderId.slice(-6)}
                  </div>
                  <div className="order-date">
                    {orderDate}
                  </div>
                  <div className={`order-status ${status.toLowerCase()}`}>
                    <FaCheckCircle /> {status}
                  </div>
                </div>

                <div className="order-restaurant">
                  {restaurantName}
                </div>

                <div className="order-items">
                  {order?.items?.length > 0 ? (
                    order.items.map((item, idx) => (
                      <div key={idx} className="order-item">
                        <div className="item-name">
                          {item.quantity || 1}x {item.product?.name || "Product"}
                        </div>
                        <div className="item-price">
                          $
                          {((item.quantity || 0) * (item.price || 0)).toFixed(2)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No items found</p>
                  )}
                </div>

                <div className="order-footer">
                  <div className="total-label">Total</div>
                  <div className="total-price">
                    ${totalAmount}
                  </div>
                </div>

                <button className="reorder-button">Reorder</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;