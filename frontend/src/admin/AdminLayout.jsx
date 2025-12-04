import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import "./admin.css";

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-content">
        <Outlet />   {/* THIS WAS MISSING */}
      </div>
    </div>
  );
};

export default AdminLayout;
