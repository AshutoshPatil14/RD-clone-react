import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./admin.css";

const AdminSidebar = () => {
    const router = useNavigate();


  return (
    <div className="admin-sidebar">
      <h2 className="admin-logo">Admin Panel</h2>

      <nav>
        <NavLink to="/admin" end className="admin-nav-link" onClick={() => router("/admin")}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/orders" className="admin-nav-link" onClick={() => router("/admin/orders")}>
          Orders
        </NavLink>

        <NavLink to="/admin/products" className="admin-nav-link" onClick={() => router("/admin/products")}>
          Products
        </NavLink>

        <NavLink to="/admin/users" className="admin-nav-link" onClick={() => router("/admin/users")}>
          Users
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
