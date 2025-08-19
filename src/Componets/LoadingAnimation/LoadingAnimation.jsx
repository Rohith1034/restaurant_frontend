import React, { useEffect, useState } from 'react';
import './LoadingAnimation.css';

const LoadingAnimation = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className="loader">
        <div className="loader-ring"></div>
        <div className="loader-ring-inner"></div>
        <div className="utensils-logo">
          <div className="fork"></div>
          <div className="spoon"></div>
        </div>
      </div>

      <div className="loading-text">
        Loading{dots}
      </div>
    </div>
  );
};

export default LoadingAnimation;
