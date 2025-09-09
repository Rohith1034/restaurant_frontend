import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './Hero.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const userId = Cookies.get("userId");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchResults = async () => {
            if (!searchValue) {
                setSearchResults([]);
                return;
            }
            setIsLoading(true);
            try {
                const { data } = await axios.get(`https://restaurant-backend-uclq.onrender.com/search?query=${searchValue}`, {
                    headers: { userId }
                });
                setSearchResults(data.results || []);
            } catch (err) {
                console.error("Search Error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        const debounce = setTimeout(fetchResults, 300);
        return () => clearTimeout(debounce);
    }, [searchValue, userId]);

    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">Delicious food delivered to your door</h1>
                <p className="hero-subtitle">Discover the best restaurants in your city and order online</p>
                
                <div className="hero-search-container">
                    <div className="hero-search">
                        <input 
                            type="text" 
                            placeholder="Search for restaurants or dishes..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <button className="search-button">
                            <FaSearch /> Search
                        </button>
                    </div>
                    
                    {searchValue && (
                        <div className="search-dropdown">
                            {isLoading ? (
                                <div className="loading">Searching...</div>
                            ) : searchResults.length > 0 ? (
                                searchResults.map(item => (
                                    <div key={item.id} className="search-item">
                                        {item.image && (
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="search-item-image"
                                            />
                                        )}
                                        <div className="search-item-text">
                                            <div className="item-name">{item.name}</div>
                                            <div className="item-type">{item.type}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="search-item">No results found</div>
                            )}
                        </div>
                    )}
                </div>
                
                <div className="hero-categories">
                    <button className="category-btn active" onClick={() => {
                        navigate("/allProducts");
                    }}>All</button>
                    <button className="category-btn"  onClick={() => {
                        navigate("allProducts#Pizza");
                    }}>Pizza</button>
                    <button className="category-btn"  onClick={() => {
                        navigate("allProducts#Pizza");
                    }}>Burger</button>
                    <button className="category-btn"  onClick={() => {
                        navigate("allProducts#Burgers");
                    }}>Burger</button>
                    <button className="category-btn" onClick={() => {
                        navigate("allProducts#Pasta");
                    }}>Pasta</button>
                    <button className="category-btn" onClick={() => {
                        navigate("allProducts#Salads");
                    }}>Salad</button>
                    <button className="category-btn" onClick={() => {
                        navigate("allProducts#Soups");
                    }}>Soups</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;