import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import { toast } from "react-hot-toast";
import "../styles/single-product-page.css";

const SingleProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        if (response.status === 200) {
          setProduct(response.data.product);
        }
      } catch (error) {
        setError(error);
        toast.error(error.response?.data?.message || "Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="loading-indicator">Loading product details...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  if (!product) {
    return <div className="no-product-found">No product found.</div>;
  }

  return (
    <div className="single-product-page">
      <h1>{product.name}</h1>
      <div className="product-details">
        <div className="product-image-container">
          <img src={product.imgUrl || "/images/placeholder.png"} alt={product.name} />
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p><strong>Color:</strong> {product.color}</p>
          <p className="product-price">₹{product.price}</p>
          <p><strong>Description:</strong> {product.description}</p>
          {/* Add more product details here */}
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;