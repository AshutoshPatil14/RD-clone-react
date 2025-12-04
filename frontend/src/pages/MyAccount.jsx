import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyProfile from "../components/MyProfile";
import MyOrders from "../components/MyOrders";
import MyAddresses from "../components/MyAddresses";
import MyWishlist from "../pages/MyWishlist";
import AccountSidebar from "../components/AccountSidebar";
import "../styles/account.css";
import MyReceivedOrders from "../components/MyReceivedOrders";

const MyAccount = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("MyProfile");

  if (!user) {
    navigate("/login");
    return null;
  }

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "MyProfile":
        return <MyProfile />;
      case "MyOrders":
        return <MyOrders />;
      case "MyReceivedOrders":
        return <MyReceivedOrders />;
      case "MyAddresses":
        return <MyAddresses />;
      case "MyWishlist":
        return <MyWishlist />;
      default:
        return <MyProfile />;
    }
  };

  return (
    <div className="account-page-container">
      <div className="account-sidebar-wrapper">
        <AccountSidebar setActiveComponent={setActiveComponent} activeComponent={activeComponent} />
      </div>
      <div className="account-content-wrapper">
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default MyAccount;
