// src/VendorRoutes/VendorSignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/vendorLogin.module.css';
import Alert from '../../components/UI/Alert';
import {
  validateFullname,
  validateEmail,
  validatePhone,
  validatePassword,
} from "../../frontendUtils/validation";
import { vendorSignUpUser } from "../../API/signup";

function VendorSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  console.log(formData.fullname);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    isVisible: false,
    type: 'info',
    message: '',
  });

  // Handle input changes and reset specific field errors
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: '',
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate inputs and set errors if any
    const newErrors = {};
    const fullnameCheck = validateFullname(formData.fullname);
    const emailCheck = validateEmail(formData.email);
    const phoneCheck = validatePhone(formData.phone);
    const passwordCheck = validatePassword(formData.password, formData.confirmPassword);

    if (!fullnameCheck.isValid) newErrors.fullname = fullnameCheck.error;
    if (!emailCheck.isValid) newErrors.email = emailCheck.error;
    if (!phoneCheck.isValid) newErrors.phone = phoneCheck.error;
    if (!passwordCheck.isValid) newErrors.password = passwordCheck.error;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const formattedData = {
        ...formData,
        phone: formData.phone.replace(/\D/g, ''), // Remove non-numeric characters
      };
      console.log('Formatted Data:', formattedData);
      await vendorSignUpUser(formattedData);
      

      setAlertInfo({
        isVisible: true,
        type: 'success',
        message: 'Registration successful!',
      });

      setFormData({
        fullname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
      setErrors({});

      // Optional: Redirect to login after successful signup
      setTimeout(() => {
        navigate('/vendor/login');
      }, 2000);
    } catch (error) {
      setAlertInfo({
        isVisible: true,
        type: 'error',
        message: error.message || 'Registration failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/vendor/login');
  };

  return (
    <div className={`${styles.gridContainer} ${styles.signup}`}>
      <div className={styles.formWrap}>
        <Alert 
          isVisible={alertInfo.isVisible}
          type={alertInfo.type}
          message={alertInfo.message}
          onClose={() => setAlertInfo({ ...alertInfo, isVisible: false })}
        />

        <h2>Sign Up</h2>

        <form className={styles.formGrid} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              id="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
            <label htmlFor="username">Full Name</label>
            {errors.username && <div className={styles.error}>{errors.username}</div>}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <label htmlFor="email">Email</label>
            {errors.email && <div className={styles.error}>{errors.email}</div>}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
            <label htmlFor="phone">Phone Number</label>
            {errors.phone && <div className={styles.error}>{errors.phone}</div>}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
            <label htmlFor="password">Password</label>
            {errors.password && <div className={styles.error}>{errors.password}</div>}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword}</div>}
          </div>

          <div className={styles.btnWrap}>
            <button className={styles.btnsubmit} type="submit" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <button onClick={handleLoginRedirect} className={styles.buttonSubmit}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}

export default VendorSignup;