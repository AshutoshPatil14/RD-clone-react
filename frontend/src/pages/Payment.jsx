import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/payment.css";

// Payment form (stubbed submit redirects to success)
const Payment = () => {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/payment/success");
  };

  return (
    <main>
      <h2>Complete Your Payment</h2>
      <form className="payment-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="paymentMode">Payment Mode</label>
          <select id="paymentMode" required>
            <option value="">-- Select --</option>
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
            <option value="upi">UPI</option>
            <option value="netbanking">Net Banking</option>
          </select>
        </div>

        <div>
          <label htmlFor="name">Cardholder Name</label>
          <input id="name" placeholder="e.g. Ted Mosby" required />
        </div>

        <div>
          <label htmlFor="cardNumber">Card Number</label>
          <input id="cardNumber" placeholder="1234 5678 9012 3456" required />
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="expiry">Expiry Date</label>
            <input id="expiry" placeholder="MM/YY" required />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="cvv">CVV</label>
            <input type="password" id="cvv" placeholder="123" required />
          </div>
        </div>

        <button type="submit" className="payment-button">Pay ₹97,998</button>
      </form>
    </main>
  );
};

export default Payment;