import React from "react";
import { Link } from "react-router-dom";
import "../styles/logreg.css";

// Registration form (visual only)
const Register = () => {
  return (
    <main>
      <div className="reg-form">
        <form className="form">
          <img src="/images/logo.png" alt="Reliance Digital" />
          <h2>Create Your Account</h2>

          <label>First Name</label>
          <input placeholder="e.g. Ted" required />

          <label>Last Name</label>
          <input placeholder="e.g. Mosby" required />

          <label>Email Address</label>
          <input type="email" placeholder="e.g. ted@example.com" required />

          <label>Password</label>
          <input type="password" placeholder="••••••••" required />

          <div className="gender-options">
            <label>
              <input type="radio" name="gender" /> Male
            </label>
            <label>
              <input type="radio" name="gender" /> Female
            </label>
          </div>

          <div className="register-as">
            <label>Register as</label>
            <select>
              <option>Customer</option>
              <option>Admin</option>
            </select>
          </div>

          <button type="submit">Register</button>
          <p className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;