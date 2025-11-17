import React from "react";
import { Link } from "react-router-dom";
import "../styles/payment-failed.css";

// Payment failure page
const PaymentFailed = () => {
  return (
    <main>
      <div className="box">
        <h1>✖ Payment Failed</h1>
        <p>Something went wrong. Please try again.</p>
        <Link to="/payment">Retry Payment</Link>
      </div>
    </main>
  );
};

export default PaymentFailed;