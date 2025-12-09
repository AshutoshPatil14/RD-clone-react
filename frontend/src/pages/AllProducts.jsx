import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { toast } from "react-hot-toast";
import "../styles/all-products.css"; // Import the new CSS file
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const router = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const user = useSelector((state) => state.auth.user);
  const userId = user?.userId;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products/all-products");
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch products");
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run once on mount

  if (loading) {
    return <div className="loading-indicator">Loading products...</div>; // Loading indicator
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const colorMatch = selectedColor === "All" || product.color === selectedColor;
    return categoryMatch && colorMatch;
  });

  const handleAddToCart = async (event, product) => {
    event.stopPropagation(); // Stop event from bubbling up to the product card
    try {
      // console.log(product, userId)
      const response = await api.post("/cart/add-to-cart", { productId: product._id, userId });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const handleBuyNow = async (event, product) => {
    event.stopPropagation(); // Stop event from bubbling up to the product card
    try {
      const response = await api.post("/cart/buy-now", { productId: product._id, userId });
      toast.success(response.data.message);
      router("/cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "An unknown error occurred");
    }
  };

  return (
    <div className="all-products-page">
      <h1>All Products</h1>
      <div className="content-container">
        <div className="filter-section">
          <h2>Filters</h2>
          <div className="filter-group">
            <h3>Category</h3>
            <select onChange={handleCategoryChange} value={selectedCategory}>
              <option value="All">All</option>
              <option value="laptop">Laptop</option>
              <option value="mobile">Mobile</option>
              <option value="tablet">Tablet</option>
              <option value="tv">TV</option>
              <option value="headphone">Headphone</option>
              <option value="speaker">Speaker</option>
              <option value="camera">Camera</option>
              <option value="smart-watch">Smart Watch</option>
              <option value="washing-machine">Washing Machine</option>
              <option value="refrigerator">Refrigerator</option>
              <option value="air-conditioner">Air Conditioner</option>
            </select>
          </div>
          <div className="filter-group">
            <h3>Color</h3>
            {["All", "red", "green", "blue", "yellow", "orange", "purple", "black", "white"].map(
              (color) => (
                <label key={color} className="color-filter-label">
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    checked={selectedColor === color}
                    onChange={handleColorChange}
                  />
                  {color !== "All" && (
                    <span className="color-icon" style={{ backgroundColor: color }}></span>
                  )}
                  {color}
                </label>
              )
            )}
          </div>
        </div>
        <div className="products-container">
          {filteredProducts.map((product) => (
            <div
              className="product-card"
              key={product._id}
              onClick={() => router(`/product/${product._id}`)}
            >
              <div className="product-details-container">
                <img src={product.imgUrl || "/images/placeholder.png"} alt={product.name} />
                <h3>{product.name}</h3>
                <p>Color: {product.color}</p>
                <span>₹{new Intl.NumberFormat("en-IN").format(product.price)}</span>
              </div>
              <div className="product-action-btn-container">
                <button
                  className="product-action-btn"
                  onClick={(event) => handleAddToCart(event, product)}
                >
                  Add to Cart
                </button>
                <button
                  className="product-action-btn"
                  onClick={(event) => handleBuyNow(event, product)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
