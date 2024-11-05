import React, { useState } from 'react';
import styles from '../css/Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className={styles.container}>
      <div className={styles.blob}></div>
      <div className={styles.blob2}></div>
      
      <div className={styles.loginCard}>
        <h1 className={styles.header}>Welcome Back! <br/>
        Relax & Order</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
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

          <a href="/menu" className={styles.forgotLink}>
            Forgot your username?
          </a>

          <button type="submit" className={styles.submitButton}>
            Login
          </button>

          <p className={styles.signupText}>
            Don't have an account? <a href="/account">Sign up here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;