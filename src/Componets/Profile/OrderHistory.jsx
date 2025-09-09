// src/components/profile/OrderHistory.js
import React from "react";
import { FaClock, FaCheckCircle } from "react-icons/fa";
import "./OrderHistory.css";

const OrderHistory = ({ orders = [] }) => {
  const limitedOrders = orders.slice(0, 6); // ✅ limit to 6

  console.log(limitedOrders);

  return (
    <div className="order-history">
      <div className="section-header">
        <h2 className="section-title">Order History</h2>
      </div>

      {limitedOrders.length === 0 ? (
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
          {limitedOrders.map((order) => (
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

              <div className="order-restaurant">{order.restaurant}</div>

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
                <div className="total-price">${order.totalAmount.toFixed(2)}</div>
              </div>

              <button className="reorder-button">Reorder</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
