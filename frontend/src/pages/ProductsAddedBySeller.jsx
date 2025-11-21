import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { toast } from "react-hot-toast";
import "../styles/products-added-by-seller.css"; // Import the new CSS file
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductsAddedBySeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/seller/products-added");
        if (response.status === 200) {
          setProducts(response.data.products);
        }
      } catch (error) {
        setError(error);
        toast.error(error.response?.data?.message || "Failed to fetch products");
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchProducts();
  }, [user]); // Empty dependency array to run once on mount

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.put(`/seller/delete-product/${productId}`, { sellerId: user.userId });
        toast.success("Product deleted successfully!");
        setProducts(products.filter((product) => product._id !== productId));
      } catch (err) {
        console.error("Error deleting product:", err);
        toast.error("Error deleting product. Please try again.");
      }
    }
  };

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  if (loading) {
    return <div className="loading-indicator">Loading products...</div>; // Loading indicator
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  return (
    <div className="seller-products-page">
      <h1>Products Added By Seller</h1>
      <div className="products-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <img src={product.imgUrl || "/images/placeholder.png"} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Color: {product.color}</p>
              <span>₹{product.price}</span>
              <div className="product-actions">
                <button onClick={() => handleEdit(product._id)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(product._id)} className="delete-button">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products added by this seller yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsAddedBySeller;
