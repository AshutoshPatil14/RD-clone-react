import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AccountSidebar = () => {
  const location = useLocation();

  return (
    <div className="left-section">
      <div className="profile-name">
        <img src="/icons/account_circle_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg" alt="profile" />
        <h4>Ashutosh Patil</h4>
      </div>
      <p>Account</p>
      <div className="account-links">
        <Link to="/account" className={location.pathname === '/account' ? 'selected' : ''}>
          <img src="/icons/account_circle_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg" alt="" />
          <span>My Profile</span>
        </Link>
        <Link to="/account/orders" className={location.pathname === '/account/orders' ? 'selected' : ''}>
          <img src="/icons/orders_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg" alt="" />
          <span>My Orders</span>
        </Link>
        <Link to="/account/addresses" className={location.pathname === '/account/addresses' ? 'selected' : ''}>
          <img src="/icons/location_on_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg" alt="" />
          <span>Delivery Addresses</span>
        </Link>
        <Link to="/account/wishlist" className={location.pathname === '/account/wishlist' ? 'selected' : ''}>
          <img src="/icons/favorite_24dp_434343.FILL1_wght400_GRAD0_opsz24.svg" alt="" />
          <span>My Wishlist</span>
        </Link>
        <a href="#">
          <img src="/icons/logout_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg" alt="" />
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
};

export default AccountSidebar;