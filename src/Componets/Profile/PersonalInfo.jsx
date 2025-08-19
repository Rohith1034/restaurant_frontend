// src/components/profile/PersonalInfo.js
import React, { useEffect, useState } from "react";
import { FaEdit, FaSave, FaTimes, FaUser } from "react-icons/fa";
import "./PersonalInfo.css";
import axios from "axios";
import { PiSignOutBold } from "react-icons/pi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const PersonalInfo = ({ user, editMode, setEditMode }) => {
  const userId = user._id;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    profileImg: user.profileImage || "", // Base64 image string
    createdAt: user.createdAt,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    Cookies.remove("userId");
    navigate("/");
  }

  useEffect(() => {
    const date = new Date(formData.createdAt);

    const formatted = date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });

    setFormData({...formData,createdAt: formatted});

  },[]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profileImg: reader.result })); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // formData.profileImg will be the Base64 string for MongoDB
    const res = await axios.put(
      `https://restaurant-backend-uclq.onrender.com/update/${userId}`,
      formData,
      {
        headers: {
          userId: userId,
        },
      }
    );
    console.log(res);
    setEditMode(false);
  };

  return (
    <div className="personal-info">
      <div className="section-header">
        <h2 className="section-title">Personal Information</h2>
        {!editMode ? (
          <button className="edit-button" onClick={() => setEditMode(true)}>
            <FaEdit /> Edit
          </button>
        ) : (
          <div className="edit-actions">
            <button
              className="cancel-button"
              onClick={() => setEditMode(false)}
            >
              <FaTimes /> Cancel
            </button>
            <button className="save-button" onClick={handleSubmit}>
              <FaSave /> Save Changes
            </button>
          </div>
        )}
      </div>

      {!editMode ? (
        <div className="info-grid">
          <div className="info-item profile-img-box">
            {formData.profileImg != "" ? (
              <img
                src={formData.profileImg || "/default-profile.png"}
                alt="Profile"
                className="profile-img"
              />
            ) : (
              <FaUser />
            )}
          </div>
          <div className="info-item">
            <div className="info-label">Full Name</div>
            <div className="info-value">{user.name}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Email Address</div>
            <div className="info-value">{user.email}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Phone Number</div>
            <div className="info-value">{user.phone || "Not provided"}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Member Since</div>
            <div className="info-value">{formData.createdAt}</div>
          </div>
          <div className="info-item" onClick={handleSignOut}>
            <div className="info-label">SignOut</div>
            <div className="info-value"><PiSignOutBold /></div>
          </div>  
        </div>
      ) : (
        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            {formData.profileImg !== "" ? (
              <FaUser />
            ) : (
              <img
                src={formData.profileImg}
                alt="Preview"
                className="profile-img-preview"
              />
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default PersonalInfo;
