// src/VendorRoutes/VendorLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/vendorLogin.module.css';
import Alert from '../../components/UI/Alert';
import {
  validateUsername,
  validatePassword,
} from "../../frontendUtils/validation";
import { loginUser } from "../../API/signIn";

function VendorLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

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
    const usernameCheck = validateUsername(formData.username);
    const passwordCheck = validatePassword(formData.password);

    if (!usernameCheck.isValid) newErrors.username = usernameCheck.error;
    if (!passwordCheck.isValid) newErrors.password = passwordCheck.error;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      await loginUser(formData);

      setAlertInfo({
        isVisible: true,
        type: 'success',
        message: 'Login successful!',
      });

      setTimeout(() => {
        navigate('/vendor/dashboard'); // redirect to user dashboard
      }, 2000);
    } catch (error) {
      setAlertInfo({
        isVisible: true,
        type: 'error',
        message: error.message || 'Login failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignupRedirect = () => {
    navigate('/vendor/signup');
  };

  return (
    <div className={`${styles.gridContainer} ${styles.login}`}>
      <div className={styles.formWrap}>
        <Alert 
          isVisible={alertInfo.isVisible}
          type={alertInfo.type}
          message={alertInfo.message}
          onClose={() => setAlertInfo({ ...alertInfo, isVisible: false })}
        />

        <h2>Login</h2>

        <form className={styles.formGrid} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
            <label htmlFor="username">Full Name</label>
            {errors.username && <div className={styles.error}>{errors.username}</div>}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <label htmlFor="password">Password</label>
            {errors.password && <div className={styles.error}>{errors.password}</div>}
          </div>

          <div className={styles.btnWrap}>
            <button className={styles.btnsubmit} type="submit" disabled={loading}>
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </div>
        </form>

        <button onClick={handleSignupRedirect} className={styles.buttonSubmit}>
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
}

export default VendorLogin;