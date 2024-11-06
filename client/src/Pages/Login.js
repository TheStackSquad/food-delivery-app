// src/Pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import styles from '../css/Login.module.css';
import signIn from '../API/signIn';

const Login = () => {
  // Initialize state for username, password, and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await signIn(username, password); // Call API to sign in
      if (response.success) {
        setTimeout(() => {
          alert('Login Successful');
          navigate('/menu'); // Redirect to /menu after 2-second delay
        }, 2000); // 2-second delay before redirection
      } else {
        setTimeout(() => {
          alert('User Not Recognized, Sign Up For An Account');
        }, 4000); // Show error message after a delay
      }
    } catch (err) {
      setError('Login failed. Please try again.'); // Set error message for display
      console.error(err); // Log error for debugging
    }
  };
  

  return (
    <div className={styles.container}>
      {/* Background design elements */}
      <div className={styles.blob}></div>
      <div className={styles.blob2}></div>

      {/* Display error message if it exists */}
      {error && (
        <div className={styles.errorMessage}>
          <p>{error}</p>
        </div>
      )}

      {/* Login form container */}
      <div className={styles.loginCard}>
        <h1 className={styles.header}>Welcome Back! <br /> Relax & Order</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Username input field */}
          <div className={styles.inputGroup}>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="username">Username</label>
            <div className={styles.inputLine}></div>
          </div>

          {/* Password input field */}
          <div className={styles.inputGroup}>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="password">Password</label>
            <div className={styles.inputLine}></div>
          </div>

          {/* Forgot username link */}
          <a href="/menu" className={styles.forgotLink}>
            Forgot your username?
          </a>

          {/* Submit button */}
          <button type="submit" className={styles.submitButton}>
            Login
          </button>

          {/* Sign-up prompt */}
          <p className={styles.signupText}>
            Don't have an account? <a href="/account">Sign up here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;