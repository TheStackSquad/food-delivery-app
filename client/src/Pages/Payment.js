import React from 'react';
import { FaPaypal, FaCreditCard, FaApplePay, FaGooglePay } from 'react-icons/fa';
import '../css/payment.css';

function Payment() {
  return (
    <>
      <div className='payment-container'>
        <div className='payment-grid'>

          <div className='payment-header'>
            <h4>Payment Method</h4>
            <img className='payment-profile-image' alt='profile' />
          </div>

          <div className='payment-methods'>
            <h4>Select Your Payment Method</h4>
            <p>Add a new Debit/Credit Card</p>

            <div className='payment-methods-list'>
              <div className='payment-card'>
                <FaPaypal className='payment-card-logo' />
                PayPal
              </div>
              <div className='payment-card'>
                <FaCreditCard className='payment-card-logo' />
                Credit Card
              </div>
              <div className='payment-card'>
                <FaApplePay className='payment-card-logo' />
                Apple Pay
              </div>
              <div className='payment-card'>
                <FaGooglePay className='payment-card-logo' />
                Google Pay
              </div>
            </div>

            <div className='payment-card-details'>
              <h4>Card Details</h4>
              <input type='text' placeholder='Card Number' />
              <input type='text' placeholder='Expiration Date' />
              <input type='text' placeholder='CVC' />
              <input type='text' placeholder='Name on Card' />
            </div>
          </div>
          <button className='payment-btn'>Proceed</button>
        </div>
      </div>
    </>
  );
}

export default Payment;
