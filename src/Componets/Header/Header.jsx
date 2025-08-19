// src/components/Header.js
import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = ({ cartCount, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRoute = (e) => {
    e.preventDefault();
    navigate("/profile", { state: { user } });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Debounced search
  useEffect(() => {
    const fetchResults = async () => {
      if (!searchValue) {
        setSearchResults([]);
        return;
      }
      setIsLoading(true);
      try {
        const { data } = await axios.get(`https://restaurant-backend-uclq.onrender.com/search?query=${searchValue}`, {
          headers: {
            userId: user._id,
          },
        });
        console.log(data);
        setSearchResults(data.results);
      } catch (err) {
        console.error("Search Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [searchValue]);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo-container">
          <div className="logo">TasteFlow</div>
          <button className="menu-toggle" onClick={toggleMenu}>
            <FaBars />
          </button>
        </div>

        {/* Navigation */}
        <div className={`nav-container ${isMenuOpen ? "open" : ""}`}>
          <nav className="nav">
            <Link to="/dashboard" className="nav-link active">
              Home
            </Link>
            <Link to="/allRestaurants" className="nav-link">
              Restaurants
            </Link>
            <a href="#" className="nav-link">
              About
            </a>
            <a href="#footer" className="nav-link">
              Contact
            </a>
          </nav>

          {/* Search */}
          <div className="search-container" style={{ position: 'relative' }}>
            <div className="search-input">
              <input
                type="text"
                placeholder="Search restaurants, dishes..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <FaSearch className="search-icon" />
            </div>

            {/* Search Dropdown */}
            {searchResults.length > 0 && (
              <div className="search-dropdown">
                {isLoading && <div className="loading">Loading...</div>}
                {searchResults.map((item) => (
                  <div
                    key={item._id}
                    className="search-item"
                    onClick={() => {
                      navigate(
                        item.type === "restaurant"
                          ? `/restaurant/${item._id}`
                          : `/product/${item._id}`
                      );
                      setSearchValue("");
                      setSearchResults([]);
                    }}
                  >
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      className="search-item-image"
                    />
                    <div className="search-item-text">
                      <span className="item-name">{item.name}</span>
                      <span className="item-type">{item.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart & User */}
          <div className="action-buttons">
            <div className="cart-icon" onClick={() => navigate("/cart")}>
              <FaShoppingCart />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </div>
            <div className="user-profile">
              {user.profileImage ? (
                <img
                  className="user_profile_pic"
                  src={user.profileImage}
                  alt={user.name}
                  onClick={handleRoute}
                />
              ) : (
                <div className="user_profile_pic" onClick={handleRoute}>
                  <FaUser />
                </div>
              )}
              <span className="username">{user.name}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
