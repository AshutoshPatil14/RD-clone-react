import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/cart.css";
import { useSelector } from "react-redux";
import api from "../api/axiosConfig";
import { toast } from "react-hot-toast";

// Cart page with two sample items and summary
const Cart = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const userId = user?.userId;
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/cart/get-cart-products/${userId}`);
        if (response.status === 200) {
          setCartItems(response.data);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch cart items");
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleEmptyCart = async (userId) => {
    try {
      const response = await api.post(`/cart/empty-cart/${userId}`);
      if (response.status === 200) {
        toast.success("Cart emptied successfully");
        setCartItems([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to empty cart");
    }
  };

  const handleMoveToWishlist = async (productId) => {
    try {
      const response = await api.post(`/wishlist/add-to-wishlist`, { userId, productId });
      if (response.status === 200) {
        toast.success("Product moved to wishlist");
      }
      setCartItems(cartItems.filter((item) => item.product._id !== productId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to move to wishlist");
    }
  };
  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await api.post(`/cart/remove-from-cart`, { userId, productId });
      if (response.status === 200) {
        toast.success("Product removed from cart");
        setCartItems(cartItems.filter((item) => item.product._id !== productId));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove from cart");
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    try {
      const response = await api.post(`/cart/update-quantity`, { userId, productId, newQuantity });
      if (response.status === 200) {
        toast.success("Quantity updated successfully");
      } else {
        toast.error(response?.data?.message || "Failed to update quantity");
      }
      setCartItems(
        cartItems.map((item) =>
          item.product._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update quantity");
    }
  };

  if (loading) {
    return <div className="loading-indicator">Loading cart...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to view your cart.</div>;
  }

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const promotion = 0; // Example promotion, can be dynamic
  const totalAmount = totalPrice - promotion;

  return (
    <div>
      <div className="cart-container">
        <div className="cart-heading">
          <div className="cart-title">
            <h2>My Cart</h2>
            <p>({cartItems.length} items)</p>
          </div>
          <div className="empty-cart">
            <button onClick={() => handleEmptyCart(userId)}>
              <img src="/icons/delete_24dp_000093_FILL0_wght400_GRAD0_opsz24.svg" alt="delete" />
              <p>Empty Cart</p>
            </button>
          </div>
        </div>

        <div className="cart-body">
          {/* Left: items */}
          <div className="left-body">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div className="cart-item-card" key={item.product._id}>
                  <div className="card-upper-part">
                    <div className="item-img">
                      <img
                        src={item.product.imgUrl || "/images/placeholder.png"}
                        alt={item.product.name}
                      />
                      <div className="item-quantity">
                        <button
                          className="decrease-btn"
                          onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          className="increase-btn"
                          onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="item-details">
                      <div className="item-description">
                        <h3>{item.product.name}</h3>
                        <h2>₹{new Intl.NumberFormat("en-IN").format(item.product.price)}</h2>
                        <p>
                          MRP <span>(Inclusive of all taxes)</span>
                        </p>
                        <div className="delivery-info">
                          <img
                            src="/icons/delivery_truck_speed_24dp_1ECCB0_FILL1_wght400_GRAD0_opsz24.svg"
                            alt="delivery"
                          />
                          <p>Free Delivery by Tomorrow</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-lower-part">
                    <button
                      className="save-btn"
                      onClick={() => handleMoveToWishlist(item.product._id)}
                    >
                      Move to Wishlist
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveFromCart(item.product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="right-body">
            <div className="apply-coupon">
              <button onClick={() => toast("Functionality not implemented yet")}>
                <div className="apply-coupon-btn">
                  <img
                    src="/icons/local_activity_24dp_3535F3_FILL1_wght400_GRAD0_opsz24.svg"
                    alt="coupon"
                  />
                  <h4>Apply Coupon Code</h4>
                </div>
                <img
                  src="/icons/keyboard_arrow_right_24dp_3535F3_FILL1_wght400_GRAD0_opsz24.svg"
                  alt=""
                />
              </button>
            </div>
            <div className="payment-section">
              <h4 className="payment-description-box2">Payment Summary</h4>
              <div className="payment-description-box">
                <p>Price ({totalItems} items)</p>
                <p>₹{new Intl.NumberFormat("en-IN").format(totalPrice)}</p>
              </div>
              <div className="payment-description-box">
                <span>Promotion</span>
                <p>-₹{new Intl.NumberFormat("en-IN").format(promotion)}</p>
              </div>
              <div className="payment-description-box">
                <span>Delivery Charges</span>
                <p>₹0</p>
              </div>
              <div className="payment-description-box2">
                <p>Total</p>
                <p>₹{new Intl.NumberFormat("en-IN").format(totalAmount)}</p>
              </div>
              <div className="payment-description-box3">
                <div className="payment-description-box4">
                  <p>{totalItems} items</p>
                  <span>₹{new Intl.NumberFormat("en-IN").format(totalAmount)}</span>
                </div>
                <div>
                  <Link to="/payment">
                    <button>Checkout</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
