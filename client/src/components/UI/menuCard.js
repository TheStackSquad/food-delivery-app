// Card Components  And Container For The Menu Page
import React from 'react';
import styles from '../../css/MenuCard.module.css';

export const Card = ({ children, className = '' }) => (
    <div className={`${styles.card} ${className}`}>{children}</div>
  );
  
  export const CardContent = ({ children }) => (
    <div className={styles.cardContent}>{children}</div>
  );
  
  export const CardHeader = ({ children }) => (
    <div className={styles.cardHeader}>{children}</div>
  );
  
  export const CardTitle = ({ children }) => (
    <h3 className={styles.cardTitle}>{children}</h3>
  );
  
  // Select Components
  export const Select = ({ children, onValueChange, defaultValue }) => {
    const handleChange = (e) => onValueChange && onValueChange(e.target.value);
  
    return (
      <select
        className={styles.select}
        defaultValue={defaultValue}
        onChange={handleChange}
      >
        {children}
      </select>
    );
  };
  
  export const SelectContent = ({ children }) => (
    <div className={styles.selectContent}>{children}</div>
  );
  
  export const SelectItem = ({ value, children }) => (
    <option className={styles.selectItem} value={value}>
      {children}
    </option>
  );
  
  export const SelectTrigger = ({ children }) => (
    <div className={styles.selectTrigger}>{children}</div>
  );
  
  export const SelectValue = ({ placeholder }) => (
    <span className={styles.selectValue}>{placeholder}</span>
  );