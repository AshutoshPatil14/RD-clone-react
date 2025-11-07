import React from "react";
import "../styles/login.css"

const Login = () => {
  return (
    <div class="log-form">
      <form class="login-form">
        <img src="../images/logo.png" alt="Reliance Digital" />
        <h2>Login to Your Account</h2>

        <input type="email" placeholder="Email Address" required />
        <input type="password" placeholder="Password" required />

        <button type="submit">Login</button>

        <p class="login-link">
          Don't have an account? <a href="reg.html">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
