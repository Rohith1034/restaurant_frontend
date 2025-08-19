// src/components/profile/AddressSection.js
import React, { useState } from "react";
import { FaEdit, FaPlus, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import "./AddressSection.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const AddressSection = ({ addresses, editMode, setEditMode }) => {
  const userId = Cookies.get("userId");
  const [addressList, setAddressList] = useState(addresses || []);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    isDefault: false,
  });

  const handleAddAddress = async () => {
    try {
      const res = await axios.post(
        `https://restaurant-backend-uclq.onrender.com/${userId}/addNewAddress`,
        newAddress,{
          headers: {
            userId:userId
          }
        }
      );
      if (res.status === 200) {
        toast.success(res.data.msg);
        setAddressList(res.data.addresses); // always use backend’s version
        setNewAddress({
          street: "",
          city: "",
          state: "",
          zipCode: "",
          isDefault: false,
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Server error. Try again.");
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
  };

  const handleSaveEdit = async () => {
    if (!editingAddress) return;
    try {
      const res = await axios.put(
        `http://localhost:5000/${userId}/updateAddress/${editingAddress._id}`,
        editingAddress,{
          headers: {
            userId:userId
          }
        }
      );
      if (res.status === 200) {
        toast.success(res.data.msg);
        setAddressList(res.data.addresses);
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to update address.");
    }
    setEditingAddress(null);
  };

  const handleDeleteAddress = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/${userId}/deleteAddress/${id}`,{
          headers: {
            userId:userId
          }
        }
      );
      if (res.status === 200) {
        toast.success(res.data.msg);
        setAddressList(res.data.addresses);
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to delete address");
    }
  };

  const handleNewAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNewAddress = (e) => {
    e.preventDefault();
    setEditMode(true);
  };

  return (
    <div className="address-section">
      <div className="section-header">
        <h2 className="section-title">My Addresses</h2>
      </div>

      {addressList.length === 0 ? (
        <div className="empty-address">
          <div className="empty-icon">
            <FaMapMarkerAlt />
          </div>
          <h3>No Address Found</h3>
          <p>
            You haven't added any delivery address yet. Add one to get started!
          </p>
          <button className="order-button" onClick={handleNewAddress}>
            Add Address
          </button>
        </div>
      ) : !editMode ? (
        <button className="edit-button" onClick={() => setEditMode(true)}>
          <FaEdit /> Edit
        </button>
      ) : (
        <div className="edit-actions">
          <button className="cancel-button" onClick={() => setEditMode(false)}>
            <FaTimes /> Cancel
          </button>
        </div>
      )}

      {editMode && (
        <div className="add-address-form">
          <h3 className="form-title">Add New Address</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Street Address</label>
              <input
                type="text"
                name="street"
                value={newAddress.street}
                onChange={handleNewAddressChange}
                placeholder="Enter street address"
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={newAddress.city}
                onChange={handleNewAddressChange}
                placeholder="Enter city"
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={newAddress.state}
                onChange={handleNewAddressChange}
                placeholder="Enter state"
              />
            </div>
            <div className="form-group">
              <label>ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                value={newAddress.zipCode}
                onChange={handleNewAddressChange}
                placeholder="Enter ZIP code"
              />
            </div>
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="defaultAddress"
                name="isDefault"
                checked={newAddress.isDefault}
                onChange={handleNewAddressChange}
              />
              <label htmlFor="defaultAddress">Set as default address</label>
            </div>
          </div>
          <button
            className="add-button"
            onClick={handleAddAddress}
            disabled={
              !newAddress.street ||
              !newAddress.city ||
              !newAddress.state ||
              !newAddress.zipCode
            }
          >
            <FaPlus /> Add Address
          </button>
        </div>
      )}

      <div className="address-grid">
        {addressList.map((address) => (
          <div
            key={address._id}
            className={`address-card ${address.isDefault ? "default" : ""}`}
          >
            {address.isDefault && <div className="default-badge">Default</div>}

            {editingAddress?._id === address._id ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Street Address</label>
                  <input
                    type="text"
                    name="street"
                    value={editingAddress.street}
                    onChange={handleEditAddressChange}
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={editingAddress.city}
                    onChange={handleEditAddressChange}
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={editingAddress.state}
                    onChange={handleEditAddressChange}
                  />
                </div>
                <div className="form-group">
                  <label>ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={editingAddress.zipCode}
                    onChange={handleEditAddressChange}
                  />
                </div>
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id={`default-${address._id}`}
                    name="isDefault"
                    checked={editingAddress.isDefault}
                    onChange={handleEditAddressChange}
                  />
                  <label htmlFor={`default-${address._id}`}>
                    Set as default address
                  </label>
                </div>
                <div className="edit-actions">
                  <button
                    className="cancel-button"
                    onClick={() => setEditingAddress(null)}
                  >
                    <FaTimes /> Cancel
                  </button>
                  <button className="save-button" onClick={handleSaveEdit}>
                    <FaSave /> Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="address-details">
                  <div className="address-line">{address.street}</div>
                  <div className="address-line">
                    {address.city}, {address.state} {address.zipCode}
                  </div>
                </div>

                {editMode && (
                  <div className="address-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditAddress(address)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteAddress(address._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressSection;
