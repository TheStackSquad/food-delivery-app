// src/Pages/Checkout.js
import React, { useState } from 'react';
import { FaRegCreditCard, FaEye, FaEyeSlash, FaCamera } from 'react-icons/fa';
import flutterwaveImg from '../asset/img/flutterwave.jpg';
import paystackImg from '../asset/img/paystack.png';
import interswitchImg from '../asset/img/interswitch.png';
import styles from '../css/Payment.module.css';

const Checkout = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [showSecurityCode, setShowSecurityCode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment processing logic here
  };

  const isFormValid =
    cardNumber.length === 16 &&
    expiryDate.length === 5 &&
    securityCode.length === 3 &&
    zipCode.length === 5;

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutWrapper}>
      <h2 className={styles.title}>Checkout</h2>
      
      <button className={styles.scanButton}>
        <FaCamera className={styles.icon} />
        Scan Card
      </button>

      <div className={styles.paymentGateways}>
        <div className={styles.gatewayCard}>
          <FaRegCreditCard className={styles.gatewayIcon} />
        </div>
        <div className={styles.gatewayCard}>
          <img src={flutterwaveImg} alt="Flutterwave" className={styles.gatewayImage} />
        </div>
        <div className={styles.gatewayCard}>
          <img src={paystackImg} alt="Paystack" className={styles.gatewayImage} />
        </div>
        <div className={styles.gatewayCard}>
          <img src={interswitchImg} alt="Interswitch" className={styles.gatewayImage} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Form Fields */}
        <label className={styles.label}>
          Card Number
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength={16}
              required
              className={styles.input}
            />
            <FaRegCreditCard className={styles.inputIcon} />
          </div>
        </label>

        <label className={styles.label}>
          Expiry Date
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            maxLength={5}
            required
            className={styles.input}
            placeholder="MM/YY"
          />
        </label>

        <label className={styles.label}>
          Security Code
          <div className={styles.inputContainer}>
            <input
              type={showSecurityCode ? 'text' : 'password'}
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
              maxLength={3}
              required
              className={styles.input}
            />
            <span onClick={() => setShowSecurityCode(!showSecurityCode)}>
              {showSecurityCode ? (
                <FaEye className={styles.inputIcon} />
              ) : (
                <FaEyeSlash className={styles.inputIcon} />
              )}
            </span>
          </div>
        </label>

        <label className={styles.label}>
          Zip Code
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            maxLength={5}
            required
            className={styles.input}
          />
        </label>

        <button
          type="submit"
          className={`${styles.payButton} ${!isFormValid ? styles.disabled : ''}`}
          disabled={!isFormValid}
        >
          Pay
        </button>
      </form>
    </div>
    </div>
  );
};

export default Checkout;
