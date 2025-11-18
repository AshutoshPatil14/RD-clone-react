import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../api/axiosConfig';
import { logout } from '../features/authSlice';
import toast from 'react-hot-toast';

const AccountSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await api.post('/auth/logout');
      if (response.status === 200) {
        dispatch(logout());
        toast.success('Logged out successfully');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  };

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
        <button onClick={handleLogout} className="link-button" style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
          <img src="/icons/logout_24dp_434343_FILL1_wght400_GRAD0_opsz24.svg" alt="" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AccountSidebar;