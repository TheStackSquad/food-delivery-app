// src/components/UI/dashboardCard.js

import React from 'react';
import styles from '../../css/dashboardCard.module.css';

export const DashboardCard = ({ children, className }) => (
  <div className={`${styles.card} ${className}`}>{children}</div>
);

export const DashboardCardContent = ({ children, className }) => (
  <div className={`${styles.cardContent} ${className}`}>{children}</div>
);
