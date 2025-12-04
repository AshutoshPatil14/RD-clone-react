import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const res = await api.get("/admin/orders");
    setOrders(res.data.orders);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div>
      <h1>All Orders</h1>

      <div className="admin-orders-container">
        {orders.map(order => (
          <div key={order._id} className="admin-order-card">

          <p><b>Order ID:</b> {order._id}</p>
          <p><b>Customer:</b> {order.customer.name} ({order.customer.email})</p>
          <p><b>Total:</b> ₹{order.totalAmount.toLocaleString()}</p>
          <p><b>Status:</b> {order.status}</p>

          <h4>Products:</h4>
          {order.products.map(item => (
            <div key={item._id} className="admin-order-product">
              <img src={item.imgUrl} alt={item.name} />
              <p>
                {item.name} — ₹{item.price} (x{item.quantity})
                <br />
                <small>Seller: {item.seller.name}</small>
              </p>
            </div>
          ))}

          <hr />
        </div>
      ))}
      </div>
    </div>
  );
};

export default AdminOrders;
