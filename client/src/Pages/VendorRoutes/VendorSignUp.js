// src/VendorRoutes/SignUp.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/vendorLogin.module.css';
import {
  validateUsername,
  validateEmail,
  validatePhone,
  validatePassword,
} from "../../frontendUtils/validation";
import signUpUser from "../../API/signup";
import useFlashMessage from '../../hooks/flashMessage';

function Signup() {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
 // const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, messageType, showMessage] = useFlashMessage(5000);

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
   // setSuccess('');
    setLoading(true);

    // Validate inputs and set errors if any
    const newErrors = {};
    const usernameCheck = validateUsername(formData.username);
    const emailCheck = validateEmail(formData.email);
    const phoneCheck = validatePhone(formData.phone);
    const passwordCheck = validatePassword(formData.password, formData.confirmPassword);

    if (!usernameCheck.isValid) newErrors.username = usernameCheck.error;
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
      await signUpUser(formattedData);

      showMessage('Registration successful!');
      setFormData({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
      setErrors({});
    } catch (error) {
      showMessage(
        error.message || 'Registration failed. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className={`${styles.gridContainer} ${isSignup ? styles.signup : styles.login}`}>
      <div className={styles.formWrap}>
         {/* Flash message with dynamic styling */}
         {message && (
          <div 
            className={`
              ${styles.flashMessage} 
              ${messageType === 'success' ? styles.successMessage : styles.errorMessage}
            `}
          >
            {message}
          </div>
        )}
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>


        <form className={styles.formGrid} onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <div className={styles.inputGroup}>
                <label htmlFor="username">Full Name</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
                {errors.username && <div className={styles.error}>{errors.username}</div>}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="1234567890"
                  required
                />
                {errors.phone && <div className={styles.error}>{errors.phone}</div>}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
                {errors.password && <div className={styles.error}>{errors.password}</div>}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
                {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword}</div>}
              </div>

              <div className={styles.btnWrap}>
                <button className={styles.btnsubmit} type="submit" disabled={loading}>
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
              </div>
            </>
          )}

          {!isSignup && (
            <>
              <div className={styles.inputGroup}>
                <label htmlFor="username">Full Name</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
                {errors.username && <div className={styles.error}>{errors.username}</div>}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                {errors.password && <div className={styles.error}>{errors.password}</div>}
              </div>

              <div className={styles.btnWrap}>
                <button className={styles.btnsubmit} type="submit" disabled={loading}>
                  {loading ? 'Logging In...' : 'Login'}
                </button>
              </div>
            </>
          )}
        </form>

        <button onClick={toggleForm} className={styles.buttonSubmit}>
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}

Signup.propTypes = {
  isSignup: PropTypes.bool,
};

export default Signup;
