import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import api from "../api/axiosConfig";
import { clearCart } from "../features/cartSlice";
import "../styles/payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user);
  const { cartItems } = useSelector((state) => state.cart);
  console.log(user)

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Default to Cash on Delivery

  useEffect(() => {
    if (!user) {
      toast.error("Please login to proceed with payment.");
      navigate("/login");
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items to cart.");
      navigate("/cart");
    }
  }, [user, cartItems, navigate]);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      toast.error("User not authenticated.");
      setLoading(false);
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Cannot place order with an empty cart.");
      setLoading(false);
      return;
    }

    try {
      const orderData = {
        userId: user._id,
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: calculateTotalPrice(),
        paymentMethod: paymentMethod,
        shippingAddress: user.shippingAddress || "Default Address", // Assuming user has a default address or will add one
      };

      const response = await api.post("/orders/create", orderData);

      if (response.status === 201) {
        toast.success("Order placed successfully!");
        dispatch(clearCart());
        navigate("/payment/success");
      } else {
        toast.error("Failed to place order.");
        navigate("/payment/failed");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error(error.response?.data?.message || "An error occurred while placing your order.");
      navigate("/payment/failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user || cartItems.length === 0) {
    return null; // Or a loading spinner/message
  }

  return (
    <main className="payment-page">
      <h2>Complete Your Payment</h2>
      <div className="payment-container">
        <div className="order-summary">
          <h3>Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item.productId} className="summary-item">
              <span>{item.name} (x{item.quantity})</span>
              <span>₹{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="summary-total">
            <span>Total:</span>
            <span>₹{calculateTotalPrice().toLocaleString()}</span>
          </div>
        </div>

        <form className="payment-form" onSubmit={handlePlaceOrder}>
          <h3>Payment Method</h3>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              Cash on Delivery
            </label>
            {/* Add more payment options here if needed */}
            {/* <label>
              <input
                type="radio"
                value="Card"
                checked={paymentMethod === "Card"}
                onChange={() => setPaymentMethod("Card")}
                disabled // For now, only COD is enabled
              />
              Credit/Debit Card (Coming Soon)
            </label> */}
          </div>

          <button type="submit" className="payment-button" disabled={loading}>
            {loading ? "Placing Order..." : `Place Order for ₹${calculateTotalPrice().toLocaleString()}`}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Payment;
