//src/Pages/VendorRoutes/VendorPayment.js
import React from 'react';
import { MdFilterList, MdChat } from 'react-icons/md';
import Money from '../../asset/img/money.png';
import styles from '../../css/VendorPayout.module.css';

function VendorPayment() {
  return (
    <div className={styles.container}>
       <div className={styles.payoutWrapper}>
      <h1 className={styles.header}>Payouts</h1>

      <div className={styles.historySection}>
        <h2 className={styles.historyTitle}>History</h2>
        <button className={styles.filterButton}>
        <MdFilterList className={styles.filterIcon} />
          Filter
        </button>
      </div>

      <div className={styles.emptyStateContainer}>
        <div className={styles.imageContainer}>
          <img 
            src={Money} 
            alt="No payouts" 
            className={styles.moneyIcon}
          />
        </div>
        <h3 className={styles.noPayoutText}>No payouts</h3>
        <p className={styles.subText}>Your payouts will appear here</p>
      </div>

      <button className={styles.chatButton}>
      <MdChat className={styles.chatIcon} />
      </button>
      </div>
     
    </div>
  );
}

export default VendorPayment;