import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { toast } from "react-hot-toast";
import "../styles/all-products.css"; // Import the new CSS file
import { useNavigate } from "react-router-dom";


const AllProducts = () => {
  const router = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");


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
            </select>
          </div>
          <div className="filter-group">
            <h3>Color</h3>
            {["All", "red", "green", "blue", "yellow", "orange", "purple", "black", "white"].map((color) => (
              <label key={color}>
                <input
                  type="radio"
                  name="color"
                  value={color}
                  checked={selectedColor === color}
                  onChange={handleColorChange}
                />
                {color}
              </label>
            ))}
          </div>
        </div>
        <div className="products-container">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product._id} onClick={() => router(`/product/${product._id}`)} >
              <img src={product.imgUrl || '/images/placeholder.png'} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Color: {product.color}</p>
              <span>₹{product.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
