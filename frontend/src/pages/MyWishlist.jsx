import React, { useEffect, useState } from 'react';
import "../styles/my-account.css";
import { useSelector } from 'react-redux';
import api from '../api/axiosConfig';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const MyWishlist = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const userId = user?.userId;

  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchWishlistItems = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/wishlist/get-wishlist-products/${userId}`);
        console.log(response.data);
        if (response.status === 200) {
          setWishlistItems(response.data);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch wishlist items");
        setWishlistItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistItems();
  }, [userId]);

  if (loading) {
    return <div className="loading-indicator">Loading wishlist...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to view your wishlist.</div>;
  }

  const handleRemoveFromWishlist = async (event, productId) => {
    event.stopPropagation();
    try {
      const response = await api.delete("/wishlist/remove-from-wishlist", { data: { productId, userId } });
      toast.success(response.data.message);
      setWishlistItems(prevItems => prevItems.filter(item => item.product._id !== productId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove from wishlist");
    }
  };

  const handleMoveToCart = async (event, productId) => {
    event.stopPropagation();
    try {
      const response = await api.post("/cart/add-to-cart", { productId, userId });
      toast.success(response.data.message);
      setWishlistItems(prevItems => prevItems.filter(item => item.product._id !== productId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to move to cart");
    }
  };




  return (
    <div className="wishlist-container">
      <div className="wishlist-heading">
        <div className="wishlist-title">
          <h2>My Wishlist</h2>
          <p>({wishlistItems.length} items)</p>
        </div>
      </div>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-items-grid">
          {wishlistItems.map((item) => (
            <div className="product-card" key={item.product._id}>
              <Link to={`/product/${item.product._id}`}>
                <img
                  src={item.product.imgUrl || '/images/placeholder.png'}
                  alt={item.product.name}
                  className="product-image"
                />
                <h3 className="product-name">{item.product.name}</h3>
                <p className="product-price">₹{new Intl.NumberFormat('en-IN').format(item.product.price)}</p>
              </Link>
              <div className="product-actions">
                <button className="move-to-cart-btn" onClick={() => handleMoveToCart(event, item.product._id)}>Move to Cart</button>
                <button
                  className="remove-from-wishlist-btn"
                  onClick={(event) => handleRemoveFromWishlist(event, item.product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlist;