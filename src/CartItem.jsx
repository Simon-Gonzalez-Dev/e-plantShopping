import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Get total number of items in cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Increment quantity for a specific item
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement quantity for a specific item
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  // Remove an item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  // Calculate subtotal for an item (unit price * quantity)
  const calculateTotalCost = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  // Placeholder for checkout functionality
  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Coming Soon');
  };

  return (
    <div className="cart-container">
      <div className="cart-summary">
        <h2>Shopping Cart Summary</h2>
        <div className="cart-stats">
          <div className="cart-stat">
            <span>Total Items:</span>
            <span>{totalItems}</span>
          </div>
          <div className="cart-stat">
            <span>Total Cost:</span>
            <span>${calculateTotalAmount()}</span>
          </div>
        </div>
      </div>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div className="cart-items-container">
          {cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img
                className="cart-item-image"
                src={item.image || "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg"}
                alt={item.name}
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginRight: '10px'
                }}
              />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">Unit Price: ${item.price}</div>
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">
                    {item.quantity}
                  </span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  Total: ${calculateTotalCost(item)}
                </div>
                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="cart-actions">
        <button className="continue-shopping-btn" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button className="checkout-btn" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;