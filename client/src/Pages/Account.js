import React from 'react';
import styles from '../css/Account.module.css';

const Account = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.formHeader}>
          <h2 className={styles.title}>Sign-Up <br /> Here!</h2>
        </div>
        <div className={styles.formWrapper}>
          <form className={styles.formBox}>
            {/* Full Name */}
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>Full Name</label>
              <input type="text" id="name" placeholder="John Doe" className={styles.input} required />
            </div>

            {/* Email Address */}
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input type="email" id="email" placeholder="you@example.com" className={styles.input} required />
            </div>

            {/* Phone Number */}
            <div className={styles.inputGroup}>
              <label htmlFor="phone" className={styles.label}>Phone Number</label>
              <input type="tel" id="phone" placeholder="123-456-7890" className={styles.input} required />
            </div>

            {/* Delivery Address */}
            <div className={styles.inputGroup}>
              <label htmlFor="address" className={styles.label}>Delivery Address</label>
              <input type="text" id="address" placeholder="123 Main St, Apt 1" className={styles.input} required />
            </div>

            {/* City/State */}
            <div className={styles.inputGroup}>
              <label htmlFor="city" className={styles.label}>City/State</label>
              <input type="text" id="city" placeholder="City, State" className={styles.input} required />
            </div>

            {/* Preferred Delivery Time */}
            <div className={styles.inputGroup}>
              <label htmlFor="deliveryTime" className={styles.label}>Preferred Delivery Time</label>
              <input type="time" id="deliveryTime" className={styles.input} />
            </div>

            {/* Password */}
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input type="password" id="password" placeholder="Create a password" className={styles.input} required />
            </div>

            {/* Confirm Password */}
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
              <input type="password" id="confirmPassword" placeholder="Confirm your password" className={styles.input} required />
            </div>

            {/* Submit Button */}
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;