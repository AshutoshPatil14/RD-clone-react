import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../api/axiosConfig";

import BrandLoader from "./BrandLoader";

const MyOrders = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    if (!user || !user.userId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await api.get(`/user/order/get-orders/${user.userId}`);
      if (response.status === 200) {
        setOrders(response.data.orders);
      } else {
        toast.error("Failed to fetch orders.");
        setError("Failed to fetch orders.");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error(err.response?.data?.message || "An error occurred while fetching orders.");
      setError(err.response?.data?.message || "An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders)
  return (
    <div className="my-orders-container">
      <h2>My Orders</h2>
      {loading && <BrandLoader />}
      {error && <p className="error-message">Error: {error}</p>}
      {!loading && !error && orders.length === 0 && <p>No orders found.</p>}
      {!loading && !error && orders.length > 0 && (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <h3>Order ID: {order._id}</h3>
              <div className="order-products">
                <h4>Products:</h4>
                {order.products.map((item) => (
                  <div key={item._id} className="order-product-item">
                    <p>
                      <img src={item.productId.imgUrl} alt={item.productId.name} className="order-product-img" />
                      {item.productId.name} (x{item.quantity}) - ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total Amount: ₹{order.totalAmount.toLocaleString()}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
