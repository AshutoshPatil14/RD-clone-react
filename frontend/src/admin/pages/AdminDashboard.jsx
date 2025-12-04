import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });

  const loadStats = async () => {
    try {
      const ordersRes = await api.get("/admin/orders");
      const productsRes = await api.get("/admin/products");
      const usersRes = await api.get("/admin/users");

      const orders = ordersRes.data.orders || [];

      const revenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

      setStats({
        totalOrders: orders.length,
        totalUsers: usersRes.data.users.length,
        totalProducts: productsRes.data.products.length,
        totalRevenue: revenue,
      });

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="admin-stats">
        <div className="stat-card">
          <h2>{stats.totalOrders}</h2>
          <p>Orders</p>
        </div>

        <div className="stat-card">
          <h2>{stats.totalUsers}</h2>
          <p>Users</p>
        </div>

        <div className="stat-card">
          <h2>{stats.totalProducts}</h2>
          <p>Products</p>
        </div>

        <div className="stat-card">
          <h2>₹{stats.totalRevenue.toLocaleString()}</h2>
          <p>Total Revenue</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
