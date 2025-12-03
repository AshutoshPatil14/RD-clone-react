import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/logreg.css";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axiosConfig";
import { loginSuccess } from "../features/authSlice";
import toast from "react-hot-toast";

// Login form
const Login = () => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState({ role: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const InputHandler = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };

  const roleInputHandler = (event) => {
    setUserDetails({ ...userDetails, role: event.target.value });
    setErrors({ ...errors, role: "" });
  };

  const Submit = async (event) => {
    event.preventDefault();

    // console.log(userDetails);

    // Form validation
    let newErrors = {};
    if (!userDetails.role) {
      newErrors.role = "Role is required";
      toast("Please select a role");
    }
    if (!userDetails.email) {
      newErrors.email = "Please enter your email";
      toast("Please enter your email");
    }
    if (!userDetails.password) {
      newErrors.password = "Please enter your password";
      toast("Please enter your password");
    }

    setErrors(newErrors);

    // If validation passes, proceed with API call
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await api.post("/auth/login", userDetails);

        // console.log(response.data.user, "response.data.user")
        if (response.status === 200) {
          // Store user data in Redux
          dispatch(loginSuccess(response.data.user));
          // console.log("Redux auth state after login:", response.data.user);

          toast.success(
            `Hi ${response.data.user.name || userDetails.email}, \nYou are logged in successfully`
          );
          setUserDetails({ role: "", email: "", password: "" });
        } else {
          setErrors(response.data.errors);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
      }
    }
  };

  const [showPassword, setShowPassword] = useState("password");

  const ShowPassword = () => {
    setShowPassword("text");
    setTimeout(() => {
      setShowPassword("password");
    }, 1500);
  };

  useEffect(() => {
    if (user?.userId) {
      router("/");
    }
  }, [user, router]);

  return (
    <div className="logreg-container">
      <div className="log-form">
        <form className="login-form">
          <img src="/images/logo.png" alt="Reliance Digital" />
          <h2>Login to Your Account</h2>

          <select name="role" id="" onChange={roleInputHandler}>
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            onChange={InputHandler}
          />
          <div className="password-input">
            <input
              type={showPassword}
              placeholder="Password"
              name="password"
              required
              onChange={InputHandler}
            />
            <button type="button" onClick={ShowPassword}>
              Show
            </button>
          </div>
          <button type="submit" onClick={Submit}>
            Login
          </button>
          <p className="login-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
