import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from '../../css/vendorLogin.module.css';
import Alert from '../../components/UI/Alert';
import { validateEmail, validatePassword } from '../../frontendUtils/validation';
import { vendorLogin } from '../../API/signIn';
import { loginVendor as loginVendorAction } from '../../redux/actions/authActions';

function VendorLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    isVisible: false,
    type: 'info',
    message: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    // Clear the error for the field being changed
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: '',
    }));
  };

  const showAlert = (type, message) => {
    setAlertInfo({
      isVisible: true,
      type,
      message,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Destructure email and password from formData
    const { email, password } = formData;

    // Validate inputs
    const newErrors = {};
    const emailCheck = validateEmail(email);
    const passwordCheck = validatePassword(password);

    if (!emailCheck.isValid) newErrors.email = emailCheck.error;
    if (!passwordCheck.isValid) newErrors.password = passwordCheck.error;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await vendorLogin(email, password);
      
      if (!response || !response.token) {
        throw new Error('Invalid response from server');
      }

      // Assuming response has structure: { success: true, user: {...}, token: '...' }
      dispatch(loginVendorAction({
        ...response.user,
        token: response.token,
      }));

      // Store token in localStorage
      localStorage.setItem('token', response.token);

      showAlert('success', 'Login successful!');

      // Redirect after a short delay
      setTimeout(() => {
        navigate('/vendor/dashboard');
      }, 1500);
      
    } catch (error) {
      console.error('Login error:', error);
      showAlert(
        'error',
        error.message || 'Login failed. Please check your credentials and try again.'
      );
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

        <h2>Vendor Login</h2>

        <form className={styles.formGrid} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            <label htmlFor="email">Email</label>
            {errors.email && <div className={styles.error}>{errors.email}</div>}
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
            <button 
              type="submit" 
              className={styles.btnSubmit} 
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <button 
          onClick={handleSignupRedirect} 
          className={styles.buttonSubmit}
          type="button"
        >
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
}

export default VendorLogin;