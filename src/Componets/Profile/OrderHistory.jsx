// src/components/profile/OrderHistory.js
import React from 'react';
import { FaClock, FaCheckCircle } from 'react-icons/fa';
import './OrderHistory.css';

const OrderHistory = ({ orders }) => {
  // Sample orders if none provided
  const orderData = orders || [
    {
      id: 12345,
      date: '2023-10-15',
      restaurant: 'Bella Italia',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
        { name: 'Garlic Bread', quantity: 2, price: 4.99 },
      ],
      total: 22.97,
      status: 'Delivered',
    },
    {
      id: 12346,
      date: '2023-10-10',
      restaurant: 'Sushi Masters',
      items: [
        { name: 'California Roll', quantity: 2, price: 8.99 },
        { name: 'Miso Soup', quantity: 1, price: 3.99 },
      ],
      total: 21.97,
      status: 'Delivered',
    },
  ];

  return (
    <div className="order-history">
      <div className="section-header">
        <h2 className="section-title">Order History</h2>
      </div>

      {orderData.length === 0 ? (
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
          {orderData.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-id">Order #{order.id}</div>
                <div className="order-date">{order.date}</div>
                <div className={`order-status ${order.status.toLowerCase()}`}>
                  <FaCheckCircle /> {order.status}
                </div>
              </div>
              
              <div className="order-restaurant">{order.restaurant}</div>
              
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-name">{item.quantity}x {item.name}</div>
                    <div className="item-price">${(item.quantity * item.price).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              
              <div className="order-footer">
                <div className="total-label">Total</div>
                <div className="total-price">${order.total.toFixed(2)}</div>
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