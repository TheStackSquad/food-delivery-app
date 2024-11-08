import React from 'react';
import { FaLocationDot, FaArrowRight } from 'react-icons/fa6';
import styles from '../css/Menu.module.css';

function Menu() {
  return (
    <div className={styles.menuPage}>
      <div className={styles.menuContainer}>
        <div className={styles.inputWrapper}>
          <div className={styles.iconLeft}>
            <FaLocationDot className={styles.icon} />
          </div>
          <input 
            type="text" 
            placeholder="What's your location?" 
            className={styles.input}
          />
          <div className={styles.iconRight}>
            <FaArrowRight className={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;