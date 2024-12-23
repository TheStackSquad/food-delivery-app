//client/src/Pages/Account.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from '../css/Account.module.css';
import Alert from '../components/UI/Alert';
import {
  validateUsername,
  validateEmail,
  validatePhone,
  validatePassword,
} from '../frontendUtils/validation';
import { signUpUser } from '../API/signup';

const Account = () => {
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    password: '',
    confirmPassword: '',
  });

  // Error and alert management states
  const [errors, setErrors] = useState({});
  const [alertConfig, setAlertConfig] = useState({
    isVisible: false,
    type: 'info',
    message: '',
    userName: '',
  });
  const [loading, setLoading] = useState(false);

  // Suggestions state for username
  const [suggestions, setSuggestions] = useState([]);

  // Debounced validation timeout reference
  const [debounceTimer, setDebounceTimer] = useState(null);

  /**
   * Handles input changes and clears specific field errors
   */
  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    // Clear specific field error when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: '',
    }));

    // Debounced username validation
    if (id === 'username') {
      clearTimeout(debounceTimer);
      setDebounceTimer(
        setTimeout(() => {
          const { isValid, error } = validateUsername(value);
          if (!isValid) {
            setErrors((prevErrors) => ({ ...prevErrors, username: error }));
          }
        }, 300)
      );
    }
  };

  /**
   * Show alerts for validation or API errors
   */
  const showAlert = (config) => {
    setAlertConfig({
      isVisible: true,
      type: config.type || 'info',
      message: config.message,
      userName: config.userName || '',
    });
  };

  /**
   * Closes the alert
   */
  const closeAlert = () => {
    setAlertConfig((prev) => ({ ...prev, isVisible: false }));
  };

  /**
   * Handles form submission with comprehensive validation
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous states
    setErrors({});
    setLoading(true);

    // Perform input validations
    const validationChecks = {
      username: validateUsername(formData.username),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      password: validatePassword(formData.password, formData.confirmPassword),
    };

    // Collect validation errors
    const newErrors = Object.entries(validationChecks)
      .filter(([, result]) => !result.isValid)
      .reduce((acc, [key, result]) => {
        acc[key] = result.error;
        return acc;
      }, {});

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      showAlert({
        type: 'error',
        message: 'Please correct the errors in the form.',
      });
      return;
    }

    try {
      // Format data for submission
      const formattedData = {
        ...formData,
        phone: formData.phone.replace(/\D/g, ''), // Remove non-numeric characters
      };

      // Attempt user registration
      await signUpUser(formattedData);

      // Reset form on successful registration
      setFormData({
        username: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        password: '',
        confirmPassword: '',
      });

      showAlert({
        type: 'success',
        message: 'Registration successful!',
        userName: formData.username,
      });
      navigate('/login');
    } catch (error) {
      if (error.response?.status === 400) {
        const { error: errorMessage, suggestions: suggestedUsernames } = error.response.data;
        if (errorMessage.includes('Username already taken')) {
          setSuggestions(suggestedUsernames || []);
          showAlert({
            type: 'error',
            message: `${errorMessage}. Suggested usernames: ${suggestedUsernames.join(', ')}`,
          });
          setLoading(false);
          return;
        }
      }
      showAlert({
        type: 'error',
        message: error.message || 'Registration failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Redirects to login page
   */
  const handleLoginRedirect = () => navigate('/login');

  /**
   * Autofill username from suggestions
   */
  const autofillSuggestion = (suggestion) => {
    setFormData((prev) => ({ ...prev, username: suggestion }));
    setSuggestions([]);
  };

  return (
    <div className={styles.wrapper}>
      {/* Alert Component */}
      <Alert
        isVisible={alertConfig.isVisible}
        type={alertConfig.type}
        message={alertConfig.message}
        userName={alertConfig.userName}
        onClose={closeAlert}
      />

      <div className={styles.contentContainer}>
        <h2 className={styles.title}>Sign Up Here!</h2>
        <form className={styles.formBox} onSubmit={handleSubmit}>
          {[
            { id: 'username', label: 'Username', type: 'text', placeholder: 'John Doe' },
            { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
            { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '1234567890' },
            { id: 'address', label: 'Delivery Address', type: 'text', placeholder: '123 Main St' },
            { id: 'city', label: 'City/State', type: 'text', placeholder: 'City, State' },
            { id: 'password', label: 'Password', type: 'password', placeholder: 'Create a password' },
            { id: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Confirm password' },
          ].map(({ id, label, type, placeholder }) => (
            <div key={id} className={`${styles.inputGroup} ${errors[id] ? styles.inputError : ''}`}>
              <input
                type={type}
                id={id}
                value={formData[id]}
                onChange={handleChange}
                placeholder={placeholder}
                className={styles.input}
                required
              />
              <label htmlFor={id} className={styles.label}>
                {label}
              </label>
              {errors[id] && <div className={styles.error}>{errors[id]}</div>}
              {id === 'username' && suggestions.length > 0 && (
                <ul className={styles.suggestions}>
                  {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => autofillSuggestion(suggestion)}>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          <p className={styles.footerText}>
            Already have an account?{' '}
            <span onClick={handleLoginRedirect} className={styles.linkText}>
              Sign in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Account;
