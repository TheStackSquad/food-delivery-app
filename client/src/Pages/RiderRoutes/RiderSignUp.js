//client/src/RiderRoutes/RiderSignUp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/RiderSignUp.module.css";

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
    <div className={styles.signupContainer}>
     
        <h1 className={styles.header}>
          {isSignup ? "Create Rider Account" : "Log In to Your Account"}
        </h1>
        <form onSubmit={handleSubmit} className={styles.signupForm}>
          {isSignup && (
            <div className={styles.inputGroup}>
              <label
                htmlFor="name"
                className={`${styles.label} ${
                  errors.name ? styles.errorLabel : ""
                }`}
              >
                {" "}
                Full Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? styles.errorInput : ""}
              />
              {errors.name && <p className={styles.errorText}>{errors.name}</p>}
            </div>
          )}

          <div className={styles.inputGroup}>
            <label
              htmlFor="email"
              className={`${styles.label} ${
                errors.email ? styles.errorLabel : ""
              }`}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles.errorInput : ""}
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>

          {isSignup && (
            <div className={styles.inputGroup}>
              <label
                htmlFor="phone"
                className={`${styles.label} ${
                  errors.phone ? styles.errorLabel : ""
                }`}
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? styles.errorInput : ""}
              />
              {errors.phone && (
                <p className={styles.errorText}>{errors.phone}</p>
              )}
            </div>
          )}

          <div className={styles.inputGroup}>
            <label
              htmlFor="password"
              className={`${styles.label} ${
                errors.password ? styles.errorLabel : ""
              }`}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? styles.errorInput : ""}
            />
            {errors.password && (
              <p className={styles.errorText}>{errors.password}</p>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label
              htmlFor="password"
              className={`${styles.label} ${
                errors.password ? styles.errorLabel : ""
              }`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? styles.errorInput : ""}
            />
            {errors.password && (
              <p className={styles.errorText}>{errors.password}</p>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            {isSignup ? "Sign Up" : "Log In"}
          </button>

          <p
            className={styles.toggleLink}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup
              ? "Already have an account? Log in"
              : "Don’t have an account? Sign up"}
          </p>
        </form>
     
    </div>
  );
};

export default RiderSignUp;