import { Routes, Route } from 'react-router-dom';
import { useState } from 'react'; // import useState
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

function App() {
  // State to hold the cart items
  const [cart, setCart] = useState([]);

  // Function to add items to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) return; // Prevent quantity from going below 1
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <Routes>
      <Route
        path="/products"
        element={<ProductPage cart={cart} addToCart={addToCart} />}
      />
      <Route
        path="/cart"
        element={<CartPage cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />}
      />
    </Routes>
  );
}

export default App;
