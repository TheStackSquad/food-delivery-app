// src/components/UI/dashboardCard.js

import React from 'react';
import { ClipLoader } from "react-spinners";
import styles from '../../css/dashboardCard.module.css';
//import styles from '../../css/Menu.module.css';

export const DashboardCard = ({ children, className = '' }) => (
  <div className={`${styles.card} ${className}`}>{children}</div>
);

export const DashboardCardContent = ({ children, className = '' }) => (
  <div className={`${styles.cardContent} ${className}`}>{children}</div>
);

export const DashboardWrap = ({ children, className = '' }) => (
  <div className={`${styles.cardMetric} ${className}`}>{children}</div>
);


export const Modal = ({ isOpen, onClose, onConfirm, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalCard}>
      <div className={styles.modalCardWrap}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this menu item?</p>
        <div className={styles.modalButtons}>
          <button onClick={onClose} disabled={isDeleting}>
            Cancel
          </button>
          <button onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? <ClipLoader size={20} color="#ffffff" /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};


