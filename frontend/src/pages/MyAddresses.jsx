import React from "react";
import { Link } from "react-router-dom";
import "../styles/my-addresses.css";

// Delivery addresses page
const MyAddresses = () => {
  return (
    <main>
      <div className="my-account-container">
        {/* Sidebar */}
        <div className="left-section">
          <div className="profile-name">
            <img src="/icons/account_circle_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg" alt="profile" />
            <h4>Ashutosh Patil</h4>
          </div>
          <p>Account</p>
          <div className="account-links">
            <Link to="/account">
              <img src="/icons/account_circle_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg" alt="" />
              <span>My Profile</span>
            </Link>
            <Link to="/account/orders">
              <img src="/icons/orders_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg" alt="" />
              <span>My Orders</span>
            </Link>
            <Link className="selected" to="/account/addresses">
              <img src="/icons/location_on_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg" alt="" />
              <span>Delivery Addresses</span>
            </Link>
            <a href="#">
              <img src="/icons/favorite_24dp_434343.FILL1_wght400_GRAD0_opsz24.svg" alt="" />
              <span>My Wishlist</span>
            </a>
            <a href="#">
              <img src="/icons/logout_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg" alt="" />
              <span>Logout</span>
            </a>
          </div>
        </div>

        {/* Addresses */}
        <div className="right-section">
          <h2>My Delivery Addresses</h2>
          <div className="delivery-content">
            <div className="address-card">
              <h4>Ashutosh Patil</h4>
              <p>Pride City, Borgaon Road</p>
              <p>Pen, Raigad, Maharashtra – 402107</p>
              <p>Mobile: +91 9130747809</p>
              <div className="address-actions">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>

            <div className="address-card">
              <h4>Work</h4>
              <p>3rd Floor, TechPark Tower</p>
              <p>Navi Mumbai, Maharashtra – 400703</p>
              <p>Mobile: +91 9130747809</p>
              <div className="address-actions">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyAddresses;