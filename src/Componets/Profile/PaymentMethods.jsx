// src/components/profile/PaymentMethods.js
import React, { useState } from "react";
import { FaPlus, FaTrash, FaCreditCard, FaPaypal } from "react-icons/fa";
import "./PaymentMethods.css";

const PaymentMethods = ({ payments }) => {
  const [paymentMethods, setPaymentMethods] = useState(
    payments || [
      {
        id: 1,
        type: "card",
        last4: "1234",
        brand: "Visa",
        expiry: "12/25",
        isDefault: true,
      },
      {
        id: 2,
        type: "paypal",
        email: "user@example.com",
        isDefault: false,
      },
    ]
  );

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    isDefault: false,
  });

  const handleAddCard = () => {
    const last4 = newCard.number.slice(-4);
    setPaymentMethods((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "card",
        last4,
        brand: "Visa", // In a real app, you'd detect the brand
        expiry: newCard.expiry,
        isDefault: newCard.isDefault,
      },
    ]);

    setNewCard({
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      isDefault: false,
    });

    setShowAddForm(false);
  };

  const handleDeleteMethod = (id) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
  };

  const handleSetDefault = (id) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleNewCardChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCard((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="payment-methods">
      <div className="section-header">
        <h2 className="section-title">Payment Methods</h2>
        <button className="add-button" onClick={() => setShowAddForm(true)}>
          <FaPlus /> Add New
        </button>
      </div>

      {paymentMethods.length === 0 ? (
        <div className="empty-payment">
          <div className="empty-icon">
            <FaCreditCard />
          </div>
          <h3>No Payment Methods</h3>
          <p>
            You haven't added any payment options yet. Add one to make checkout
            faster!
          </p>
          <button className="order-button">Add Payment Method</button>
        </div>
      ) : (
        showAddForm && (
          <div className="add-card-form">
            <h3 className="form-title">Add Credit Card</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="number"
                  value={newCard.number}
                  onChange={handleNewCardChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              <div className="form-group">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  name="name"
                  value={newCard.name}
                  onChange={handleNewCardChange}
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiry"
                  value={newCard.expiry}
                  onChange={handleNewCardChange}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvc"
                  value={newCard.cvc}
                  onChange={handleNewCardChange}
                  placeholder="123"
                  maxLength={3}
                />
              </div>
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="defaultCard"
                  name="isDefault"
                  checked={newCard.isDefault}
                  onChange={handleNewCardChange}
                />
                <label htmlFor="defaultCard">
                  Set as default payment method
                </label>
              </div>
            </div>
            <div className="form-actions">
              <button
                className="cancel-button"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
              <button
                className="save-button"
                onClick={handleAddCard}
                disabled={
                  !newCard.number ||
                  !newCard.name ||
                  !newCard.expiry ||
                  !newCard.cvc
                }
              >
                Save Card
              </button>
            </div>
          </div>
        )
      )}

      <div className="methods-list">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`method-card ${method.isDefault ? "default" : ""}`}
          >
            <div className="method-icon">
              {method.type === "card" ? <FaCreditCard /> : <FaPaypal />}
            </div>

            <div className="method-details">
              {method.type === "card" ? (
                <>
                  <div className="method-name">
                    {method.brand} ending in {method.last4}
                  </div>
                  <div className="method-info">Expires {method.expiry}</div>
                </>
              ) : (
                <>
                  <div className="method-name">PayPal</div>
                  <div className="method-info">{method.email}</div>
                </>
              )}

              {method.isDefault && <div className="default-badge">Default</div>}
            </div>

            <div className="method-actions">
              {!method.isDefault && (
                <button
                  className="set-default"
                  onClick={() => handleSetDefault(method.id)}
                >
                  Set as Default
                </button>
              )}
              <button
                className="delete-button"
                onClick={() => handleDeleteMethod(method.id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
