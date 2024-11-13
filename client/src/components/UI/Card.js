// src/components/ui/Card.js
import React from 'react';
import styles from '../../css/Card.module.css';

// Card component to wrap the card content
export const Card = ({ children, className }) => {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
};

// CardHeader component for the card's header section
export const CardHeader = ({ children, className }) => {
  return <div className={`${styles.cardHeader} ${className}`}>{children}</div>;
};

// CardContent component for the main content of the card
export const CardContent = ({ children, className }) => {
  return <div className={`${styles.cardContent} ${className}`}>{children}</div>;
};
