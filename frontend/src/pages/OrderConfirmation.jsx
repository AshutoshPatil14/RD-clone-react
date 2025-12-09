import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/order-confirmation.css';

const OrderConfirmation = () => {

  return (
    <div className="order-confirmation-container">
      <div className="order-success">
        <h2>Order Confirmed!</h2>
        <p>Your order has been successfully placed.</p>
        <p>Thank you for your purchase!</p>
        <Link to="/my-orders" className="btn-view-orders">View My Orders</Link>
      </div>
      <Link to="/" className="btn-continue-shopping">Continue Shopping</Link>
    </div>
  );
};

export default OrderConfirmation;
