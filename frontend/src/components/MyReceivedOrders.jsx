import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../api/axiosConfig";

import BrandLoader from "./BrandLoader";

const MyReceivedOrders = () => {
  const { user } = useSelector((state) => state.auth);
  const [receivedOrders, setReceivedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    if (!user || !user.userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/seller/orders/get-seller-orders", {
        userId: user.userId,
      });

      if (response.status === 200) {
        setReceivedOrders(response.data.orders || []);
      } else {
        toast.error("Failed to fetch orders.");
        setError("Failed to fetch orders.");
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load orders");
      setError(err.response?.data?.message || "Failed to load orders");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(receivedOrders)

  return (
    <div className="my-orders-container">
      <h2>My Received Orders</h2>

      {loading && <BrandLoader />}
      {error && <p className="error-message">Error: {error}</p>}
      {!loading && !error && receivedOrders.length === 0 && <p>No orders found.</p>}

      {!loading && !error && receivedOrders.length > 0 && (
        <div className="orders-list">
          {receivedOrders.map((order) => (
            <div key={order._id} className="order-card">
              <h3>Order ID: {order._id}</h3>

              <div className="order-products">
                <h4>Products:</h4>

                {order.products?.map((item) => (
                  <div key={item._id} className="order-product-item">
                    <img
                      src={item.imgUrl}
                      alt={item.name}
                      className="order-product-img"
                    />
                    <p>
                      {item.name} (x{item.quantity}) — ₹
                      {item.price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total Amount: ₹{order.totalAmount?.toLocaleString()}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReceivedOrders;
