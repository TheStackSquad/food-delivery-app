// components/CartBadge.js
import React from 'react';
import styles from '../css/CartBadge.module.css';

const CartBadge = ({ count }) => {
  return count > 0 ? (
    <span className={styles.badge}>{count}</span>
  ) : null;
};

export default CartBadge;