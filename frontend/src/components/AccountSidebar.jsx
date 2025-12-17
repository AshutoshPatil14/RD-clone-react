import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";
import toast from "react-hot-toast";
import api from "../api/axiosConfig";

const AccountSidebar = ({ setActiveComponent, activeComponent }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(user)

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      dispatch(logout());
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="account-sidebar">
      <div className="user-info">
        <img
          src="/icons/account_circle_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg"
          alt="User Avatar"
        />
        <span>
          {user?.fname} {user?.lname}
        </span>
      </div>
      <h3>Account</h3>
      <ul>
        <li>
          <button
            onClick={() => setActiveComponent("MyProfile")}
            className={activeComponent === "MyProfile" ? "active" : ""}
          >
            <img
              src="/icons/emoji_people_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg"
              alt="My Profile"
            />
            My Profile
          </button>
        </li>
        <li>
          {user.role === "user" && (
            <button
              onClick={() => setActiveComponent("MyOrders")}
              className={activeComponent === "MyOrders" ? "active" : ""}
            >
              <img src="/icons/orders_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg" alt="My Orders" />
              My Orders
            </button>
          )}
          {user.role === "seller" && (
            <button
              onClick={() => setActiveComponent("MyReceivedOrders")}
              className={activeComponent === "MyReceivedOrders" ? "active" : ""}
            >
              <img
                src="/icons/orders_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg"
                alt="My Received Orders"
              />
              My Received Orders
            </button>
          )}
        </li>
        <li>
          <button
            onClick={() => setActiveComponent("MyAddresses")}
            className={activeComponent === "MyAddresses" ? "active" : ""}
          >
            <img
              src="/icons/location_on_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg"
              alt="Delivery Addresses"
            />
            Delivery Addresses
          </button>
        </li>
        <li>
          {user.role === "user" && (
            <button
              onClick={() => setActiveComponent("MyWishlist")}
              className={activeComponent === "MyWishlist" ? "active" : ""}
            >
              <img
                src="/icons/favorite_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg"
                alt="My Wishlist"
              />
              My Wishlist
            </button>
          )}
        </li>
        <li>
          <button onClick={handleLogout}>
            <img src="/icons/logout_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="Logout" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AccountSidebar;
