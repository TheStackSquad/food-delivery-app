//client/src/Pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'; // Import useDispatch to dispatch actions
import styles from '../css/Login.module.css';
import { loginUser } from '../API/signIn';
import { loginUser as UserloginSuccess } from '../redux/actions/authActions'; // Import the login action
import Alert from '../components/UI/Alert';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ isVisible: false, type: '', message: '', userName: '' });
  const dispatch = useDispatch(); // Get dispatch from Redux
  const userData = useSelector((state) => state.auth.user);
  console.log('Redux userData:', userData);  // Inspect the updated user data

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(username, password);
      if (response.success) {
        // Dispatch the loginSuccess action to update Redux state
        dispatch(UserloginSuccess({ username, token: response.token }));

        // Save token in localStorage for persistence across page reloads
        localStorage.setItem('token', response.token);

        // Set the alert state to show success
        setAlert({
          isVisible: true,
          type: 'success',
          message: 'Login Successful!',
          userName: username,
        });

        // Redirect to the dashboard after a short delay
        setTimeout(() => {
          navigate('/login/dashboard');
        }, 2000); // 2-second delay before redirection
      } else {
        setAlert({
          isVisible: true,
          type: 'error',
          message: 'User Not Recognized, Sign Up For An Account',
        });
      }
    } catch (err) {
      setAlert({
        isVisible: true,
        type: 'error',
        message: 'Login failed. Please try again.',
      });
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.blob}></div>
      <div className={styles.blob2}></div>

      {/* Alert component */}
      <Alert
        isVisible={alert.isVisible}
        type={alert.type}
        message={alert.message}
        userName={alert.userName}
        onClose={() => setAlert({ ...alert, isVisible: false })}
      />

      {/* Login form container */}
      <div className={styles.loginCard}>
        <h1 className={styles.header}>Welcome Back! <br /> Relax & Order</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Username input */}
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

          {/* Password input */}
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

