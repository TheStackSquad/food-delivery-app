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
  console.log('username', username);
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ isVisible: false, type: '', message: '', userName: '' });
  const dispatch = useDispatch(); // Get dispatch from Redux
  const userData = useSelector((state) => state.auth.user);
  console.log('Redux userData:', userData);  // Inspect the updated user data
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();

 //handle submit function dispatches to redux and localstorage
 const handleSubmit = async (e) => {
  console.log('handleSubmit function hit');
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await loginUser(username, password);
    setIsLoading(false);
    console.log('handleSubmit triggered, full response:', response);

    if (response.success) {
      console.log('Tokens received on frontend:', response.accessToken, response.refreshToken);

      // Prepare user data for Redux and localStorage
      const userData = {
        ...response.user,
        accessToken: response.accessToken, // Save the access token
        refreshToken: response.refreshToken, // Save the refresh token
        profilePic: response.user?.profilePic || 'default-profile-pic.webp', // Ensure profilePic is always set
      };

      // Dispatch the loginSuccess action to update Redux state
      dispatch(UserloginSuccess(userData));

      // Save the user data and tokens in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(userData));
     // localStorage.setItem('Token', response.accessToken); 
    //  localStorage.setItem('refreshToken', response.refreshToken); // Optionally, store refreshToken in localStorage or HttpOnly cookie

      console.log('User data saved to localStorage:', JSON.parse(localStorage.getItem('user')));

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
      console.log('Login failed, response:', response);
      setAlert({
        isVisible: true,
        type: 'error',
        message: 'User Not Recognized, Sign Up For An Account',
      });
    }
  } catch (err) {
    setIsLoading(false);
    console.error('Login failed, error:', err);
    setAlert({
      isVisible: true,
      type: 'error',
      message: 'Login failed. Please try again.',
    });
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

        {isLoading ? (
  <div className="spinner">Loading...</div>
) : (
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
            <div className={styles.inputLineLogin}></div>
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
            <div className={styles.inputLineLogin}></div>
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
        )}
      </div>
    </div>
  );
};

export default Login;

