import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../api/axiosConfig";

import "../styles/payment.css";


const Payment = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // console.log(user);

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [userAddress, setUserAddress] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    toast("Do not refresh the page.")
    if (!user) {
      toast.error("Please login to proceed with payment.");
      navigate("/login");
    }
  }, [user, navigate]);

  const getCartItems = async () => {
    try {
      const response = await api.get(`/cart/get-cart-products/${user.userId}`);
      if (response.status === 200) {
        // console.log(response.data)
        return setCartItems(response.data);
      } else {
        toast.error("Failed to fetch cart items.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error(error.response?.data?.message || "An error occurred while fetching cart items.");
      return [];
    }
  };

  const getUserAddress = async () => {
    try {
      const response = await api.get(`/user/get-user-address/${user.userId}`);
      if (response.status === 200) {
        // console.log(response.data)
        return setUserAddress(response.data.address);
      } else {
        toast.error("Failed to fetch user address.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching user address:", error);
      toast.error(
        error.response?.data?.message || "An error occurred while fetching user address."
      );
      return [];
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (user?.userId) {
        await getCartItems();
        await getUserAddress();
      }
    };
    fetchCart();
  }, [user?.userId]);

  // console.log(cartItems, "cartItems");
  // console.log(userAddress, "userAddress");

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
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
      if (!selectedAddressId) {
        toast.error("Please select a delivery address.");
        setLoading(false);
        return;
      }
      if (!paymentMethod) {
        toast.error("Please select a payment method.");
        setLoading(false);
        return;
      }

      const orderData = {
        userId: user.userId,
        products: cartItems.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        totalAmount: calculateTotalPrice(),
        paymentMethod: paymentMethod,
        addressId: selectedAddressId, // Use the selected address
      };

      console.log(orderData);

      const response = await api.post("/user/order/create-order", orderData);

      if (response.status === 201) toast.success("Order placed successfully!");
      navigate("/cart")
    } catch (error) {
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
        <div
          className="order-summary"
          style={{ display: "flex", flexDirection: "column", flex: 1 }}
        >
          <h3>Order Summary</h3>
          <div className="order-items">
            {cartItems.map((item) => (
              <div key={item.productId} className="summary-item">
                <img
                  src={item.product.imgUrl}
                  alt={item.product.name}
                  className="summary-item-image"
                />
                <div>
                  <span>
                    {item.product.name} (x{item.quantity})
                  </span>
                  <span>₹{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total:</span>
            <span>₹{calculateTotalPrice().toLocaleString()}</span>
          </div>
        </div>

        <div className="address-container">
          <h3>Select Delivery Address</h3>
          {userAddress.map((address) => (
            <div key={address.id} className="address-item">
              <input
                type="radio"
                name="selectedAddress"
                id={address.id}
                value={address.id}
                checked={selectedAddressId === address.id}
                onChange={() => setSelectedAddressId(address.id)}
              />
              <label htmlFor={address.id}>
                <p>
                  {address.fullName}, {address.addressLine}{" "}
                </p>
                <p>
                  {address.state}, {address.city} - {address.pincode}
                </p>
                <p>Phone: {address.mobile}</p>
              </label>
            </div>
          ))}
        </div>

        <form className="payment-form" onSubmit={handlePlaceOrder}>
          <h3>Payment Method</h3>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={() => setPaymentMethod("upi")}
              />
              UPI
            </label>
            <label>
              <input
                type="radio"
                value="cash-on-delivery"
                checked={paymentMethod === "cash-on-delivery"}
                onChange={() => setPaymentMethod("cash-on-delivery")}
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                value="credit-card"
                checked={paymentMethod === "credit-card"}
                onChange={() => setPaymentMethod("credit-card")}
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                value="debit-card"
                checked={paymentMethod === "debit-card"}
                onChange={() => setPaymentMethod("debit-card")}
              />
              Debit Card
            </label>
          </div>

          <button type="submit" className="payment-button" disabled={loading}>
            {loading
              ? "Placing Order..."
              : `Place Order for ₹${calculateTotalPrice().toLocaleString()}`}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Payment;
