import React from "react";
import { Link } from "react-router-dom";
import "../styles/my-acc.css";

// My Account page: profile sidebar + details
const MyAccount = () => {
  return (
    <main>
      <div className="my-account-container">
        {/* Left: account sidebar */}
        <div className="left-section">
          <div className="profile-name">
            <img src="/icons/account_circle_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg" alt="profile" />
            <h4>Ashutosh Patil</h4>
          </div>
          <p>Account</p>
          <div className="account-links">
            <Link className="selected" to="/account">
              <img src="/icons/account_circle_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg" alt="" />
              <span>My Profile</span>
            </Link>
            <Link to="/account/orders">
              <img src="/icons/orders_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg" alt="" />
              <span>My Orders</span>
            </Link>
            <Link to="/account/addresses">
              <img src="/icons/location_on_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg" alt="" />
              <span>Delivery Addresses</span>
            </Link>
            <a href="#">
              <img src="/icons/favorite_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg" alt="" />
              <span>My Wishlist</span>
            </a>
            <a href="#">
              <img src="/icons/logout_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg" alt="" />
              <span>Logout</span>
            </a>
          </div>
        </div>

        {/* Right: profile details */}
        <div className="right-section">
          <div className="heading">
            <h2>My Profile</h2>
          </div>

          <div className="profile-details">
            <div className="profile-details-header">
              <p>Personal Details</p>
              <button className="edit-btn">
                <img src="/icons/edit_24dp_FFFFFF_FILL1_wght400_GRAD0_opsz24.svg" alt="edit" />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="profile-info">
              {[
                ["First Name", "Ashutosh"],
                ["Last Name", "Patil"],
                ["Date Of Birth", "DD/MM/YYYY"],
                ["Gender", "Male"],
                ["Email Address", "ashutosh.patil1409@gmail.com"],
                ["Mobile Number", "9130747809"],
              ].map(([label, value]) => (
                <div className="info-row" key={label}>
                  <span className="label">{label}</span>
                  <span className="value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyAccount;