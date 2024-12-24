//client/src/components/UI/CheckoutPage.js
import React, { useState } from 'react';
import styles from '../../css/Checkout.module.css';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const cartItems = [
    { id: 1, name: 'Jollof Rice', price: 15.99, quantity: 2 },
    { id: 2, name: 'Chicken Suya', price: 12.99, quantity: 1 }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 5.99;
  const total = subtotal + deliveryFee;
  const isValid = formData.name && formData.phone && formData.address;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Checkout</h1>
        
        <div className={styles.grid}>
          {/* Cart Summary */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Order Summary</h2>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemInfo}>
                  <p>{item.name}</p>
                  <p className={styles.quantity}>Quantity: {item.quantity}</p>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            
            <div>
              <div className={styles.summaryItem}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryItem}>
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className={`${styles.summaryItem} ${styles.total}`}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Delivery Details</h2>
            <form>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={styles.input}
                  placeholder="Name"
                />
                <label htmlFor="name" className={styles.label}>Name</label>
              </div>

              <div className={styles.formGroup}>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={styles.input}
                  placeholder="Phone"
                />
                <label htmlFor="phone" className={styles.label}>Phone Number</label>
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className={styles.input}
                  placeholder="Address"
                />
                <label htmlFor="address" className={styles.label}>Delivery Address</label>
              </div>

              <div className={styles.formGroup}>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className={styles.textarea}
                  placeholder="Delivery Notes"
                />
                <label htmlFor="notes" className={styles.label}>Delivery Notes (Optional)</label>
              </div>

              <button
                disabled={!isValid}
                className={styles.button}
              >
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;