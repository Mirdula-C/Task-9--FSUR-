import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import '../App.css';

const CartPage = ({ cart, removeFromCart, updateQuantity }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const price = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalPrice(price);
  }, [cart]);

  return (
    <div className="cart-page">
      <div className="cart-page-header">
        <h1>Cart</h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart-message">Your cart is empty. Start shopping!</div>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-left">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <div>{item.title}</div>
                <div>Price: ${item.price}</div>
                <div>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="quantity-btn">-</button>
                  <span> Quantity: {item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="quantity-btn">+</button>
                </div>
              </div>
            </div>
            <div className="cart-item-right">
              <div className="item-total">
                <span>Item Cost: ${item.price * item.quantity}</span>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="remove-from-cart-btn">Remove</button>
            </div>
          </div>
        ))
      )}

      <div className="cart-total-price-container">
        <div className="total-price">Total Price: ${totalPrice.toFixed(2)}</div>
        <div className="discounted-price">Discounted Price: ${(totalPrice * 0.9).toFixed(2)}</div>
      </div>
    </div>
  );
};

CartPage.propTypes = {
  cart: PropTypes.array.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
};

export default CartPage;
