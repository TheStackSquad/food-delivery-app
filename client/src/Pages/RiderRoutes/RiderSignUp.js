//client/src/RiderRoutes/RiderSignUp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/RiderSignUp.css";

const RiderSignUp = () => {
  const navigate = useNavigate();

  // State to track form mode (signup or login)
  const [isSignup, setIsSignup] = useState(true);

  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Basic validation
  const validateForm = () => {
    let formErrors = {};
    if (isSignup && !formData.name) formErrors.name = "Name is required";
    if (!formData.email) formErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      formErrors.email = "Email is invalid";
    if (!formData.phone && isSignup)
      formErrors.phone = "Phone number is required";
    if (!formData.password) formErrors.password = "Password is required";
    return formErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      // Handle successful form submission (e.g., API call or navigation)
      console.log("Form submitted", formData);
      if (isSignup) {
        navigate("/rider/account"); // Redirect to rider's account page
      } else {
        navigate("/rider/profile"); // Redirect to rider's profile page after login
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="customSignupContainer">
    <h1 className="customHeader">
      {isSignup ? "Create Rider Account" : "Log In to Your Account"}
    </h1>
    <form onSubmit={handleSubmit} className="customSignupForm">
      {isSignup && (
        <div className="customInputGroup">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`customInput ${errors.name ? "customErrorInput" : ""}`}
            placeholder="Full Name"
          />
          <label
            htmlFor="name"
            className={`customLabel ${errors.name ? "customErrorLabel" : ""}`}
          >
            Full Name
          </label>
          {errors.name && <p className="customErrorText">{errors.name}</p>}
        </div>
      )}
  
      <div className="customInputGroup">
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`customInput ${errors.email ? "customErrorInput" : ""}`}
          placeholder="Email Address"
        />
        <label
          htmlFor="email"
          className={`customLabel ${errors.email ? "customErrorLabel" : ""}`}
        >
          Email Address
        </label>
        {errors.email && <p className="customErrorText">{errors.email}</p>}
      </div>
  
      {isSignup && (
        <div className="customInputGroup">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`customInput ${errors.phone ? "customErrorInput" : ""}`}
            placeholder="Phone Number"
          />
          <label
            htmlFor="phone"
            className={`customLabel ${errors.phone ? "customErrorLabel" : ""}`}
          >
            Phone Number
          </label>
          {errors.phone && <p className="customErrorText">{errors.phone}</p>}
        </div>
      )}
  
      <div className="customInputGroup">
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`customInput ${errors.password ? "customErrorInput" : ""}`}
          placeholder="Password"
        />
        <label
          htmlFor="password"
          className={`customLabel ${errors.password ? "customErrorLabel" : ""}`}
        >
          Password
        </label>
        {errors.password && (
          <p className="customErrorText">{errors.password}</p>
        )}
      </div>
  
      <div className="customInputGroup">
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`customInput ${
            errors.confirmPassword ? "customErrorInput" : ""
          }`}
          placeholder="Confirm Password"
        />
        <label
          htmlFor="confirmPassword"
          className={`customLabel ${
            errors.confirmPassword ? "customErrorLabel" : ""
          }`}
        >
          Confirm Password
        </label>
        {errors.confirmPassword && (
          <p className="customErrorText">{errors.confirmPassword}</p>
        )}
      </div>
  
      <button type="submit" className="customSubmitButton">
        {isSignup ? "Sign Up" : "Log In"}
      </button>
  
      <p className="customToggleLink" onClick={() => setIsSignup(!isSignup)}>
        {isSignup
          ? "Already have an account? Log in"
          : "Don’t have an account? Sign up"}
      </p>
    </form>
  </div>
  
  );
  
};

export default RiderSignUp;