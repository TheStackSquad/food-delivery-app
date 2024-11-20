// client/src/RiderRoutes/RiderSignUp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { riderSignUpUser } from "../../API/signup";
import {
  validateFullname,
  validateEmail,
  validatePhone,
  validatePassword,
} from "../../frontendUtils/validation";
import Alert from "../../components/UI/Alert";
import "../../css/RiderSignUp.css";
import "../../css/Alert.css";

const RiderSignUp = () => {
  const navigate = useNavigate();

  const [alertState, setAlertState] = useState({
    isVisible: false,
    type: "success",
    message: "",
    userName: "",
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const showAlert = (type, message, userName = "") => {
    setAlertState({
      isVisible: true,
      type,
      message,
      userName,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};

    // Validate Full Name
    const fullNameValidation = validateFullname(formData.fullName);
    if (!fullNameValidation.isValid) {
      formErrors.fullName = fullNameValidation.error;
    }

    // Validate Email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      formErrors.email = emailValidation.error;
    }

    // Validate Phone
    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      formErrors.phone = phoneValidation.error;
    }

    // Validate Password
    const passwordValidation = validatePassword(
      formData.password,
      formData.confirmPassword
    );
    if (!passwordValidation.isValid) {
      formErrors.password = passwordValidation.error;
    }

    // Confirm Password Validation
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setErrors({});

      try {
        // eslint-disable-next-line
        const response = await riderSignUpUser(formData, "/api/rider/signup");

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });

        showAlert(
          "success",
          `Hi ${formData.fullName}! Your rider application for our logistics platform has been received. We'll review your details and get back to you soon. Check your email for further instructions.`,
          formData.fullName
        );
         // Redirect to the login page after signup after 3 seconds
         setTimeout(() => {
          navigate('/rider/login');
        }, 3000);
      } catch (error) {
        showAlert(
          "error",
          error.message || "An error occurred during signup. Please try again."
        );
      }
    } else {
      setErrors(formErrors);
      showAlert(
        "error",
        "Please correct the errors in the form before submitting."
      );
    }
  };

  return (
    <>
      <Alert
        isVisible={alertState.isVisible}
        type={alertState.type}
        message={alertState.message}
        userName={alertState.userName}
        onClose={() => setAlertState((prev) => ({ ...prev, isVisible: false }))}
        autoCloseTime={5000}
      />
      <div className="customSignupContainer">
        <h1 className="customHeader">Create Rider Account</h1>
        <form onSubmit={handleSubmit} className="customSignupForm">
          <div className="customInputGroup">
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`customInput ${
                errors.fullName ? "customErrorInput" : ""
              }`}
              placeholder="Full Name"
            />
            <label
              htmlFor="fullName"
              className={`customLabel ${
                errors.fullName ? "customErrorLabel" : ""
              }`}
            >
              Full Name
            </label>
            {errors.fullName && (
              <p className="customErrorText">{errors.fullName}</p>
            )}
          </div>

          <div className="customInputGroup">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`customInput ${
                errors.email ? "customErrorInput" : ""
              }`}
              placeholder="Email Address"
            />
            <label
              htmlFor="email"
              className={`customLabel ${
                errors.email ? "customErrorLabel" : ""
              }`}
            >
              Email Address
            </label>
            {errors.email && <p className="customErrorText">{errors.email}</p>}
          </div>

          <div className="customInputGroup">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`customInput ${
                errors.phone ? "customErrorInput" : ""
              }`}
              placeholder="Phone Number"
            />
            <label
              htmlFor="phone"
              className={`customLabel ${
                errors.phone ? "customErrorLabel" : ""
              }`}
            >
              Phone Number
            </label>
            {errors.phone && <p className="customErrorText">{errors.phone}</p>}
          </div>

          <div className="customInputGroup">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`customInput ${
                errors.password ? "customErrorInput" : ""
              }`}
              placeholder="Password"
            />
            <label
              htmlFor="password"
              className={`customLabel ${
                errors.password ? "customErrorLabel" : ""
              }`}
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
            Sign Up
          </button>

          <p
            className="customToggleLink"
            onClick={() => navigate("/rider/login")}
          >
            Already have an account? Log in
          </p>
        </form>
      </div>
    </>
  );
};

export default RiderSignUp;
