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
  console.log('Form Data', formData);

  // Error and alert management states
  const [errors, setErrors] = useState({});
  const [alertConfig, setAlertConfig] = useState({
    isVisible: false,
    type: 'info',
    message: '',
    userName: '',
  });
  const [loading, setLoading] = useState(false);

  // Suggestions state for available username suggestions
  const [suggestions, setSuggestions] = useState([]); // Added state for suggestions

  /**
   * Handles input changes and clears specific field errors
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
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
  };

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
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
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

    // If validation fails, show errors and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);

      // Show error alert
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

      // Show success alert
      showAlert({
        type: 'success',
        message: 'Registration successful!',
        userName: formData.username,
      });
      navigate('/login'); // Redirect to /login
    } catch (error) {
      // Handle username uniqueness error with suggestions
      if (error.response && error.response.status === 400) {
        const { error: errorMessage, suggestions: suggestedUsernames } = error.response.data;

        // Check if the error is related to username
        if (errorMessage.includes('Username already taken')) {
          // Update the UI with suggestions
          setSuggestions(suggestedUsernames || []);

          // Show alert for username conflict
          showAlert({
            type: 'error',
            message: `${errorMessage}. Suggested usernames: ${suggestedUsernames.join(', ')}`,
          });
          setLoading(false);
          return;
        }
      }

      // General registration error handling
      showAlert({
        type: 'error',
        message: error.message || 'Registration failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Input configuration for dynamic rendering
  const inputConfigs = [
    { id: 'username', label: 'Username', type: 'text', placeholder: 'John Doe' },
    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
    { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '1234567890' },
    { id: 'address', label: 'Delivery Address', type: 'text', placeholder: '123 Main St, Apt 1' },
    { id: 'city', label: 'City/State', type: 'text', placeholder: 'City, State' },
    { id: 'password', label: 'Password', type: 'password', placeholder: 'Create a password' },
    { id: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Confirm your password' },
  ];

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
        <div className={styles.formHeader}>
          <h2 className={styles.title}>Sign Up Here!</h2>
        </div>

        <div className={styles.blob}></div>
        <form className={styles.formBox} onSubmit={handleSubmit}>
          {inputConfigs.map(({ id, label, type, placeholder }) => (
            <div key={id} className={styles.inputGroup}>
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

              {/* Add suggestions below the username field */}
              {id === 'username' && suggestions.length > 0 && (
                <div className={styles.suggestions}>
                  <h4>Suggestions for Username:</h4>
                  <ul>
                    {suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

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
