import React from "react";
import { Link } from "react-router-dom";
import "../styles/logreg.css";

// Login form
const Login = () => {
  return (
    <main>
      <div className="log-form">
        <form className="login-form">
          <img src="/images/logo.png" alt="Reliance Digital" />
          <h2>Login to Your Account</h2>
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
          <p className="login-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;