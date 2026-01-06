import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import { toast } from "react-hot-toast";
import "../styles/single-product-page.css";
import { useSelector } from "react-redux";

import BrandLoader from "../components/BrandLoader";

const SingleProductPage = () => {
  const router = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);


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

    const handleAddToCart = async (event, product) => {
    event.stopPropagation(); // Stop event from bubbling up to the product card
    try {
      // console.log(product, userId)
      const response = await api.post("/cart/add-to-cart", { productId: product._id, userId:user.userId });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const handleBuyNow = async (event, product) => {
    event.stopPropagation(); // Stop event from bubbling up to the product card
    try {
      const response = await api.post("/cart/buy-now", { productId: product._id, userId:user.userId });
      toast.success(response.data.message);
      router("/cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "An unknown error occurred");
    }
  };

  if (loading) {
    return <BrandLoader />;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  if (!product) {
    return <div className="no-product-found">No product found.</div>;
  }

  return (
    <div className="single-product-page">
      {/* <h1>{product.name}</h1> */}
      <div className="product-details">
        <div className="product-image-container">
          <img src={product.imgUrl || "/images/placeholder.png"} alt={product.name} />
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p><strong>Color:</strong> {product.color}</p>
          <p className="product-price">₹{new Intl.NumberFormat('en-IN').format(product.price)}</p>

          <div>
            <button onClick={(event) => handleAddToCart(event, product)}>Add to Cart</button>
            <button onClick={(event) => handleBuyNow(event, product)}>Buy Now</button>
          </div>
          {/* <p><strong>Description:</strong> {product.description}</p> */}
          {/* Add more product details here */}
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;