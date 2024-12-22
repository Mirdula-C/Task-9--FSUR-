import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../App.css';  

const ProductPage = ({ cart = [], addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch products from API
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  // Function to handle add to cart
  const handleAddToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      alert('The product is already added to your cart.');
    } else {
      addToCart(product);
    }
  };

  // Function to toggle description visibility
  const toggleDescription = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, showDescription: !product.showDescription }
          : product
      )
    );
  };

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the total quantity of items in the cart
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="product-page">
      <header className="header">
        <h1 className="header-title">Product Page</h1>
        <input
          type="text"
          className="search-bar"
          placeholder="Search Products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <Link to="/cart" className="cart-icon">
          <button className="cart-count-btn">
            Cart ({totalItemsInCart})  
          </button>
        </Link>
      </header>

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-details">
              <div className="product-title">{product.title}</div>
              <div className="product-price">${product.price}</div>
              
              {product.showDescription && (
                <div className="product-description">{product.description}</div>
              )}
            </div>

            <div className="product-actions">
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
              <button
                className="view-description-btn"
                onClick={() => toggleDescription(product.id)} // Toggle description visibility
              >
                {product.showDescription ? 'Hide Description' : 'View Description'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ProductPage.propTypes = {
  cart: PropTypes.array.isRequired,  
  addToCart: PropTypes.func.isRequired,  
};

export default ProductPage;
