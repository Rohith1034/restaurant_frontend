// src/components/Footer.js
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaApple, FaGooglePlay } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer id='footer' className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-about">
            <div className="logo">TasteFlow</div>
            <p className="about-text">
              TasteFlow is your one-stop solution for delicious food delivered right to your doorstep. 
              Discover the best restaurants in your city and enjoy amazing meals.
            </p>
            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4 className="links-title">For Customers</h4>
            <ul>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Popular Restaurants</a></li>
              <li><a href="#">Deals & Discounts</a></li>
              <li><a href="#">Customer Support</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4 className="links-title">For Restaurants</h4>
            <ul>
              <li><a href="#">Partner With Us</a></li>
              <li><a href="#">Restaurant Signup</a></li>
              <li><a href="#">Business Dashboard</a></li>
              <li><a href="#">Restaurant Resources</a></li>
            </ul>
          </div>
          
          <div className="footer-app">
            <h4 className="links-title">Download Our App</h4>
            <p>Get the best experience with our mobile app</p>
            <div className="app-buttons">
              <a href="#" className="app-btn">
                <FaApple className="icon" />
                <div>
                  <span>Download on the</span>
                  <strong>App Store</strong>
                </div>
              </a>
              <a href="#" className="app-btn">
                <FaGooglePlay className="icon" />
                <div>
                  <span>Get it on</span>
                  <strong>Google Play</strong>
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            &copy; {new Date().getFullYear()} TasteFlow. All rights reserved.
          </div>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;