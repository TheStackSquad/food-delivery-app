// src/VendorRoutes/SignUp.js
import React, { useState } from 'react';
import styles from '../../css/vendorLogin.module.css';

function Signup() {
  const [isSignup, setIsSignup] = useState(true); // Toggle between signup and login

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className={`${styles.gridContainer} ${isSignup ? styles.signup : styles.login}`}>
      <div className={styles.formWrap}>
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        
        <form className='formGrid'>
          {isSignup && (
            <>
              <label>Username</label>
              <input type="text" name="username" required />
              
              <label>Phone</label>
              <input type="tel" name="phone" required />
              
              <label>Password</label>
              <input type="password" name="password" required />
              
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" required />

              <div className={styles.btnWrap}>
              <button className={styles.btnsubmit} type="submit">Sign Up</button>
              </div>
            </>
          )}
          
          {!isSignup && (
            <>
              <label>Username</label>
              <input type="text" name="username" required />
              
              <label>Password</label>
              <input type="password" name="password" required />
              <div className={styles.btnWrap}>
              <button className={styles.btnsubmit} type="submit">Login</button>
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

export default Signup;
