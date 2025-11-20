import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axiosConfig.js";
import "../styles/all-products.css";
// import { useSelector } from "react-redux";

const AllProducts = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ category: "all" });
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams(filters);
        var response = await api.get(`/products/all-products?${queryParams}`);

        // console.log(response, "response")

        setProducts(response.data.products);
        
      } catch (err) {
        setError("Error fetching products. Please try again later.");
        toast.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  if (loading) {
    return <div className="loading-message">Loading products...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="no-products-message">No products found.</div>;
  }

  return (
    <div className="all-products-container">
      <div className="filter-pane">
        <h4>Filters</h4>
        <div className="filter-section">
          <label htmlFor="category-filter">Category</label>
          <select
            id="category-filter"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="all">All Categories</option>
            <option value="mobile">Mobile</option>
            <option value="laptop">Laptop</option>
            <option value="tablet">Tablet</option>
            <option value="tv">TV</option>
            <option value="headphone">Headphone</option>
          </select>
        </div>
      </div>
      <div className="products-display-area">
        <h2>All Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} className="product-card-link">
              <div className="product-card">
                <img src={product.imgUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>Price: ₹{product.price}</p>
                <p>Category: {product.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
