import React, { useState } from "react";
import "./SignUp.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const SignUp = () => {
  const navigate = useNavigate();
   const userId = Cookies.get("userId");
  
    if (userId != null) {
      navigate("/dashboard");
    }
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!agreedToTerms) newErrors.terms = "You must agree to the terms";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Signup logic here
    try {
      const res = await axios.post("https://restaurant-backend-uclq.onrender.com/signup", formData);
      if (res.status === 200) {
        toast.success(res.data.msg);
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error("Server error. Please try again");
      }
      else if (error.response && error.response.status === 409) {
        toast.error("User already exist!!!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={errors.fullName ? "error" : ""}
          placeholder="Enter your full name"
        />
        {errors.fullName && (
          <div className="error-message">{errors.fullName}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "error" : ""}
          placeholder="Enter your email"
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? "error" : ""}
          placeholder="Enter your phone number"
        />
        {errors.phone && <div className="error-message">{errors.phone}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? "error" : ""}
          placeholder="Create a password"
        />
        {errors.password && (
          <div className="error-message">{errors.password}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? "error" : ""}
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <div className="error-message">{errors.confirmPassword}</div>
        )}
      </div>

      <div className="terms">
        <input
          type="checkbox"
          id="terms"
          checked={agreedToTerms}
          onChange={() => setAgreedToTerms(!agreedToTerms)}
        />
        <label htmlFor="terms">
          I agree to the <Link to="#">Terms of Service</Link> and{" "}
          <Link href="#">Privacy Policy</Link>
        </label>
      </div>
      {errors.terms && (
        <div className="error-message terms-error">{errors.terms}</div>
      )}

      <button type="submit" className="auth-button">
        Create Account
      </button>
    </form>
  );
};

export default SignUp;
