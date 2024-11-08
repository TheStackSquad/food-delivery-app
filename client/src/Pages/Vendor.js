// Vendor.js
import React from 'react';
import CardSlide from '../components/CardSlide';
import styles from '../css/Vendor.module.css';

function Vendor() {
  return (
    <div className={styles.vendor}>
       <div className={styles.vendorContainer}>
        <div className={styles.header}>
          Geow Your Business Here!
        </div>
      <div className={styles.vendorSlide}>
        <CardSlide />
      </div>
      </div>
    </div>
  );
}

export default Vendor;