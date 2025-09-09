import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FaClock, FaCheckCircle } from "react-icons/fa";
import "./OrdersPage.css";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (!userId) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        // First, get the user to see if they have any orders
        const userRes = await axios.get(
          `https://restaurant-backend-uclq.onrender.com/user/${userId}`
        );
        
        const orderIds = userRes.data?.orders || [];
        
        if (orderIds.length === 0) {
          setOrders([]);
          setLoading(false);
          return;
        }

        // Get the latest 6 orders
        const latestOrderIds = orderIds.slice(-6).reverse(); // Get latest 6 and reverse to show newest first
        
        // Fetch details for each order
        const orderPromises = latestOrderIds.map((id) =>
          axios.get(
            `https://restaurant-backend-uclq.onrender.com/orders/${id}`,
            { headers: { userId } }
          ).then(response => response.data.order)
          .catch(err => {
            console.error(`Error fetching order ${id}:`, err);
            return null;
          })
        );

        const orderResults = await Promise.all(orderPromises);
        
        // Filter out any failed requests and ensure we have valid orders
        const validOrders = orderResults.filter(order => 
          order && order._id && typeof order._id === 'string'
        );

        setOrders(validOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <LoadingAnimation />;
  
  if (error) {
    return (
      <div className="order-history">
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

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
          {orders.map((order) => {
            // Safe access to order properties with fallbacks
            const orderId = order?._id || "N/A";
            const shortOrderId = orderId.length > 6 ? orderId.slice(-6) : orderId;
            
            const orderDate = order?.orderDate 
              ? new Date(order.orderDate).toLocaleDateString() 
              : "Unknown Date";
              
            const status = order?.status || "Pending";
            const restaurantName = order?.restaurant?.name || order?.restaurant || "Unknown Restaurant";
            const totalAmount = order?.totalAmount ? order.totalAmount.toFixed(2) : "0.00";

            return (
              <div key={orderId} className="order-card">
                <div className="order-header">
                  <div className="order-id">
                    Order #{shortOrderId}
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