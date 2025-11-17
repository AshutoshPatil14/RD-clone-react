import React from "react";
import { Link } from "react-router-dom";
import "../styles/my-orders.css";

// Orders page
const MyOrders = () => {
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
            <Link className="selected" to="/account/orders">
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

        {/* Orders */}
        <div className="right-section">
          <div className="heading">
            <h2>My Orders</h2>
            <select name="order_type" id="order_type">
              <option value="all_orders">All Orders</option>
              <option value="ordered">Ordered</option>
              <option value="under_process">Under Process</option>
              <option value="shipped">Shipped</option>
              <option value="returned">Returned</option>
              <option value="cancelled">Cancelled</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>

          <div className="order-details">
            <div className="order-details-bar">
              <span>No of items in list: 2</span>
              <p>Order Total: ₹97,998.00</p>
            </div>

            <div className="order-details-card">
              <img
                src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/lDiLDzASGg-google-pixel9a-5g-494494547-i-1-1200wx1200h.jpeg"
                alt="Product"
              />
              <div className="product-details">
                <p>Google Pixel 9a, 256 GB, 8 GB RAM, Obsidian, Mobile Phone</p>
                <h4>₹49,999.00</h4>
                <span>Qty: 2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyOrders;