import React from "react";
import { Link } from "react-router-dom";
import "../styles/payment-success.css";

// Payment success summary
const PaymentSuccess = () => {
  return (
    <main>
      <div className="container">
        <div className="success-icon">✔</div>
        <h1>Your order has been placed!</h1>
        <p>Thank you for shopping with Reliance Digital.</p>

        <div className="summary">
          <h3>Order Summary</h3>
          <div className="order-summary">
            <div className="order-img">
              <img
                src="https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/lDiLDzASGg-google-pixel9a-5g-494494547-i-1-1200wx1200h.jpeg"
                alt="Product"
              />
            </div>
            <div className="order-details">
              <p>
                <strong>Product:</strong> Google Pixel 9a, 256 GB, 8 GB RAM, Obsidian
              </p>
              <p>
                <strong>Quantity:</strong> 2
              </p>
              <p>
                <strong>Total Amount:</strong> ₹97,998
              </p>
              <p>
                <strong>Delivery Address:</strong> Pride City, Borgaon Road, Pen, Raigad, Maharashtra
              </p>
              <p>
                <strong>Expected Delivery:</strong> Tomorrow
              </p>
              <p>
                <strong>Payment Mode:</strong> Credit Card
              </p>
            </div>
          </div>
        </div>

        <Link to="/" className="btn">
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default PaymentSuccess;