import React, { useState } from 'react';
import styles from '../css/Account.module.css';
import { validateUsername,
  validateEmail,
  validatePhone,
  validatePassword } from '../frontendUtils/validation';
import signUpUser from '../API/signup';

const Account = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    deliveryTime: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input changes and reset specific field errors
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: ''
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('[handleSubmit] Form submission started');
  
    setSuccess('');
    setLoading(true);
  
    // Validate inputs and set errors if any
    const newErrors = {};
    console.log('[handleSubmit] Validating inputs');
  
    const usernameCheck = validateUsername(formData.username);
    const emailCheck = validateEmail(formData.email);
    const phoneCheck = validatePhone(formData.phone);
    const passwordCheck = validatePassword(formData.password, formData.confirmPassword);
  
    if (!usernameCheck.isValid) newErrors.username = usernameCheck.error;
    if (!emailCheck.isValid) newErrors.email = emailCheck.error;
    if (!phoneCheck.isValid) newErrors.phone = phoneCheck.error;
    if (!passwordCheck.isValid) newErrors.password = passwordCheck.error;
  
    // If there are errors, update state and stop loading
    if (Object.keys(newErrors).length > 0) {
      console.log('[handleSubmit] Validation errors:', newErrors);
      setErrors(newErrors);
      setLoading(false);
      return;
    }
  
    try {
      const formattedData = {
        ...formData,
        phone: formData.phone.replace(/\D/g, '') // Remove non-numeric characters
      };
      console.log('[handleSubmit] Formatted data ready:', formattedData);
  
      // Call signUpUser and wait for response
      console.log('[handleSubmit] Calling signUpUser...');
      await signUpUser(formattedData);
  
      // if successful
      console.log('[handleSubmit] Registration successful');
      setSuccess('Registration successful!');
      setFormData({
        username: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        deliveryTime: '',
        password: '',
        confirmPassword: ''
      });
      setErrors({});
  
      // Display success message for 5 seconds
      setTimeout(() => {
        setSuccess('');
      }, 5000); // 5000 ms = 5 seconds
  
    } catch (error) {
      console.error('[handleSubmit] Registration error:', error.message);
      setErrors({ form: error.message || 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
      console.log('[handleSubmit] Form submission process complete');
    }
  };
  

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.formHeader}>
          <h2 className={styles.title}>Sign-Up <br /> Here!</h2>
        </div>
          {/* Display global form errors */}
          {errors.form && <div className={styles.error}>{errors.form}</div>}
          {success && <div className={styles.success}>{success}</div>}

          <form className={styles.formBox} onSubmit={handleSubmit}>
            {/* Username */}
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

            {/* Email Address */}
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
              {errors.email && <div className={styles.error}>{errors.email}</div>}
            </div>

            {/* Phone Number */}
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

            {/* Delivery Address */}
            <div className={styles.inputGroup}>
              <label htmlFor="address">Delivery Address</label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, Apt 1"
                required
              />
              {errors.address && <div className={styles.error}>{errors.address}</div>}
            </div>

            {/* City/State */}
            <div className={styles.inputGroup}>
              <label htmlFor="city">City/State</label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City, State"
                required
              />
              {errors.city && <div className={styles.error}>{errors.city}</div>}
            </div>

            {/* Preferred Delivery Time */}
            <div className={styles.inputGroup}>
              <label htmlFor="deliveryTime">Preferred Delivery Time</label>
              <input
                type="time"
                id="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleChange}
                required
              />
              {errors.deliveryTime && <div className={styles.error}>{errors.deliveryTime}</div>}
            </div>

            {/* Password */}
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

            {/* Confirm Password */}
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

            {/* Submit Button */}
            <div className={styles.buttonContainer}>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
   
  );
};

export default Account;
