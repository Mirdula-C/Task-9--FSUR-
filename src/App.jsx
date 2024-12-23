import { Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import { useState } from 'react';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <Routes>
      {/* Default route to redirect from "/" to "/products" */}
      <Route path="/" element={<Navigate to="/products" />} />
      <Route
        path="/products"
        element={<ProductPage cart={cart} addToCart={addToCart} />}
      />
      <Route
        path="/cart"
        element={
          <CartPage
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        }
      />
    </Routes>
  );
}

export default App;
