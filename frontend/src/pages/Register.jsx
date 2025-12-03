import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/logreg.css";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../api/axiosConfig";

// Registration form (visual only)
const Register = () => {
  const router = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState({
    role: "user",
    fname: "",
    lname: "",
    email: "",
    password: "",
    confPassword: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});

  const InputHandler = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };

  const roleInputHandler = (event) => {
    setUserDetails({ ...userDetails, role: event.target.value });
    setErrors({ ...errors, role: "" });
  };

  const genderInputHandler = (event) => {
    setUserDetails({ ...userDetails, gender: event.target.value });
    setErrors({ ...errors, gender: "" });
  };

  const Submit = async (event) => {
    event.preventDefault();

    if (userDetails.password !== userDetails.confPassword) {
      toast.error("Passwords do not match");
      return;
    }

    let newErrors = {};
    if (!userDetails.role) newErrors.role = "Role is required";
    if (!userDetails.fname) newErrors.fname = "First Name is required";
    if (!userDetails.lname) newErrors.lname = "Last Name is required";
    if (!userDetails.email) newErrors.email = "Email is required";
    if (!userDetails.password) newErrors.password = "Password is required";
    if (!userDetails.confPassword) newErrors.confPassword = "Confirmed Password is required";
    if (!userDetails.gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    console.log(userDetails);
    if (
      userDetails.role &&
      userDetails.fname &&
      userDetails.lname &&
      userDetails.email &&
      userDetails.password &&
      userDetails.confPassword &&
      userDetails.gender
    ) {
      try {
        const response = await api.post("/auth/register", userDetails);
        if (response.status === 201) {
          toast.success(`Registeration success! \nWelcome aboard ${userDetails.fname}! `);
          setUserDetails({
            role: "user",
            fname: "",
            lname: "",
            email: "",
            password: "",
            confPassword: "",
            gender: "",
          });
          router("/login");
        } else {
          setErrors(response.data.errors);
        }
      } catch (error) {
        console.error("Error:", error);
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

  const [showConfirmPassword, setShowConfirmPassword] = useState("password");

  const ShowConfirmPassword = () => {
    setShowConfirmPassword("text");
    setTimeout(() => {
      setShowConfirmPassword("password");
    }, 1500);
  };

  useEffect(() => {
    if (user?.userId) {
      router("/");
    }
  }, [user, router]);
  return (
    <div className="logreg-container">
      <div className="reg-form">
        <form className="form">
          <img src="/images/logo.png" alt="Reliance Digital" />
          <h2>Create Your Account</h2>

          <label>First Name</label>
          <input
            name="fname"
            value={userDetails.fname}
            onChange={InputHandler}
            placeholder="e.g. Ted"
            required
          />

          <label>Last Name</label>
          <input
            name="lname"
            value={userDetails.lname}
            onChange={InputHandler}
            placeholder="e.g. Mosby"
            required
          />

          <label>Email Address</label>
          <input
            name="email"
            value={userDetails.email}
            onChange={InputHandler}
            type="email"
            placeholder="e.g. ted@example.com"
            required
          />

          <label>Password</label>
          <div className="password-input">
            <input
              name="password"
              value={userDetails.password}
              onChange={InputHandler}
              type={showPassword}
              placeholder="••••••••"
              required
            />
            <button onClick={ShowPassword} className="password-icon">
              Show
            </button>
          </div>

          <label>Confirm Password</label>
          <div className="password-input">
            <input
              name="confPassword"
              value={userDetails.confPassword}
              onChange={InputHandler}
              type={showConfirmPassword}
              placeholder="••••••••"
              required
            />
            <button onClick={ShowConfirmPassword} className="password-icon">
              Show
            </button>
          </div>

          <div className="gender-options">
            <label>
              <input type="radio" name="gender" value="male" onChange={genderInputHandler} /> Male
            </label>
            <label>
              <input type="radio" name="gender" value="female" onChange={genderInputHandler} />{" "}
              Female
            </label>
          </div>

          <div className="register-as">
            <label>Register as</label>
            <select name="role" onChange={roleInputHandler}>
              <option selected value="user">
                User
              </option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" onClick={Submit}>
            Register
          </button>
          <p className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
