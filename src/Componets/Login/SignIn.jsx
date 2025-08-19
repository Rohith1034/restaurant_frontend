// src/components/SignIn.js
import React, { useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

// Google provider: 937229950296-bhjeopfcgnjs508cj7jhhitcmhd41222.apps.googleusercontent.com
/*
  

*/ 

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
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
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Login logic here
    try {
      const res = await axios.post("https://restaurant-backend-uclq.onrender.com/login", formData);
      console.log(res);
      if (res.status === 200) {
        toast.success(res.data.msg);
        Cookies.set("userId", res.data.userId, { expires: 20 });
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized error gracefully
        toast.error("Invalid credentials. Please try again.");
      } else if (error.response && error.response.status === 404) {
        toast.error("User not found. Create account.");
      } else {
        // Handle other errors
        toast.error("Something went wrong. Please try again later.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signin-form">
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
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? "error" : ""}
          placeholder="Enter your password"
        />
        {errors.password && (
          <div className="error-message">{errors.password}</div>
        )}
      </div>

      <div className="remember-forgot">
        <div className="remember">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="remember">Remember me</label>
        </div>
        <Link to="/" className="forgot-password">
          Forgot Password?
        </Link>
      </div>

      <button type="submit" className="auth-button">
        Sign In
      </button>

      <div className="divider">
        <span>or continue with</span>
      </div>

      <div className="social-login">
        <GoogleLogin className="google"
          onSuccess={(credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);
            // Send token to backend
            axios
              .post("http://localhost:5000/auth/google", {
                token: credentialResponse.credential,
              })
              .then((res) => {
                Cookies.set("userId", res.data.userId, { expires: 20 });
                navigate("/dashboard");
              })
              .catch((err) => {
                toast.error("Google login failed");
              });
          }}
          onError={() => {
            toast.error("Google Sign In Failed");
          }}
        />
        
      </div>
    </form>
  );
};

export default SignIn;
