import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'products', 'cart'

  // Reset scroll position when changing views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleGetStartedClick = () => {
    setCurrentView('products');
  };

  const handleHomeClick = () => {
    setCurrentView('home');
  };

  const handleProductsClick = () => {
    setCurrentView('products');
  };

  const handleCartClick = () => {
    setCurrentView('cart');
  };

  const handleContinueShopping = () => {
    setCurrentView('products');
  };

  return (
    <div className="app-container">
      {currentView === 'home' && (
        <div className="landing-page">
          <div className="background-image"></div>
          <div className="content">
            <div className="landing_content">
              <h1>Welcome To Paradise Nursery</h1>
              <div className="divider"></div>
              <p>Where Green Meets Serenity</p>
              
              <button className="get-started-button" onClick={handleGetStartedClick}>
                Get Started
              </button>
            </div>
            <div className="aboutus_container">
              <AboutUs />
            </div>
          </div>
        </div>
      )}

      {(currentView === 'products' || currentView === 'cart') && (
        <ProductList 
          onHomeClick={handleHomeClick}
          onProductsClick={handleProductsClick}
          onCartClick={handleCartClick}
          onContinueShopping={handleContinueShopping}
          showCart={currentView === 'cart'}
        />
      )}
    </div>
  );
}

export default App;



