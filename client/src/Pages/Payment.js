import React from 'react';
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
                <img src='path/to/paypal-logo.png' alt='PayPal' className='payment-card-logo' />
                PayPal
              </div>
              <div className='payment-card'>
                <img src='path/to/credit-card-logo.png' alt='Credit Card' className='payment-card-logo' />
                Credit Card
              </div>
              <div className='payment-card'>
                <img src='path/to/apple-pay-logo.png' alt='Apple Pay' className='payment-card-logo' />
                Apple Pay
              </div>
              <div className='payment-card'>
                <img src='path/to/google-pay-logo.png' alt='Google Pay' className='payment-card-logo' />
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
          <button className='payment-btn'>ADD</button>
        </div>
      </div>
    </>
  );
}

export default Payment;
