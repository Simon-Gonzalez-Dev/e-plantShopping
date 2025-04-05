import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

import './ProductList.css';

function ProductList({ 
  onHomeClick, 
  onProductsClick, 
  onCartClick, 
  onContinueShopping,
  showCart = false 
}) {
  const [notification, setNotification] = useState(''); // State Notification
  const [addedToCartItems, setAddedToCartItems] = useState({}); // Track added items
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  // Calculate total quantity of items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Indoor Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12"
        },
        {
          name: "Peace Lily",
          image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
          description: "Removes mold spores and purifies the air.",
          cost: "$18"
        }
      ]
    },
    {
      category: "Fragrant Plants",
      plants: [
        {
          name: "Lavender",
          image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3",
          description: "Calming scent, used in aromatherapy.",
          cost: "$20"
        },
        {
          name: "Jasmine",
          image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3",
          description: "Sweet fragrance, promotes relaxation.",
          cost: "$18"
        }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        {
          name: "Aloe Vera",
          image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Purifies the air and has healing properties for skin.",
          cost: "$14"
        },
        {
          name: "Echeveria",
          image: "https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492_1280.jpg",
          description: "Drought-resistant rosette-shaped succulent.",
          cost: "$12"
        }
      ]
    }
  ];

  // Inline styling for navbar elements
  const styleObj = {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px'
  };

  const styleObjUl = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    maxWidth: '800px'
  };

  const styleA = {
    color: 'white',
    fontSize: '30px',
    textDecoration: 'none'
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    onCartClick();
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    onProductsClick();
  };

  // Dispatch action and show a fixed notification for 3 seconds
  const handleAddToCart = (plant) => {
    console.log("Added to cart:", plant);
    const price = parseFloat(plant.cost.replace('$', ''));
    dispatch(addItem({
      name: plant.name,
      price: price,
      quantity: 1,
      image: plant.image
    }));
    
    // Mark this item as added to cart
    setAddedToCartItems(prev => ({
      ...prev,
      [plant.name]: true
    }));
    
    setNotification(`${plant.name} added to cart!`);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  // Check if a plant is already in the cart
  const isInCart = (plantName) => {
    return addedToCartItems[plantName] || false;
  };

  return (
    <div className="product-list-container">
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <div className="luxury">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt="Paradise Nursery Logo"
            />
            <a href="/" onClick={handleHomeClick}>
              <div>
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div style={styleObjUl}>
          <div>
            <a href="#" onClick={handlePlantsClick} style={styleA}>
              Plants
            </a>
          </div>
          <div>
            <a href="#" onClick={handleCartClick} style={styleA}>
              <h1 className="cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  height="68"
                  width="68"
                >
                  <rect width="156" height="156" fill="none"></rect>
                  <circle cx="80" cy="216" r="12"></circle>
                  <circle cx="184" cy="216" r="12"></circle>
                  <path
                    d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                    fill="none"
                    stroke="#faf9f9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                {cartItemCount > 0 && (
                  <span className="cart-count">{cartItemCount}</span>
                )}
              </h1>
            </a>
          </div>
        </div>
      </div>

      {/* Fixed Notification Popup */}
      {notification && (
        <div 
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            zIndex: 1000,
            fontSize: '18px'
          }}
          className="notification"
        >
          {notification}
        </div>
      )}

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, catIndex) => (
            <div key={`${category.category}-${catIndex}`} className="category">
              <h2 className="category-title">{category.category}</h2>
              <div className="category-plants">
                {category.plants.map((plant, index) => (
                  <div key={`${plant.name}-${index}`} className="plant-card">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="plant-image"
                    />
                    <div className="plant-details">
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <p className="plant-cost">{plant.cost}</p>
                      <button 
                        onClick={() => handleAddToCart(plant)}
                        disabled={isInCart(plant.name)}
                        className={isInCart(plant.name) ? "button-disabled" : ""}
                      >
                        {isInCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={onContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;