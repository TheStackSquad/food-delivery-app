// src/components/Snap.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { horizontalSlide, slideAnimation } from '../animations/snapSlide';
import vendorData from '../data/VendorData';
import styles from '../css/Snap.module.css';

const Snap = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleNavIndex, setVisibleNavIndex] = useState(0);

  const handleTagClick = (index) => {
    setActiveIndex(index);

    // Adjust visibleNavIndex to keep 3 items in view
    if (index >= visibleNavIndex + 3) {
      setVisibleNavIndex(index - 2); // Shift to show the selected item and the next two items
    } else if (index < visibleNavIndex) {
      setVisibleNavIndex(index); // Shift back to keep the selected item at the start
    }
  };

  return (
    <div className={styles.snapContainer}>
      {/* Navbar with 3 visible items */}
      <div className={styles.navbar}>
        {vendorData.liTags
          .slice(visibleNavIndex, visibleNavIndex + 3)
          .map((item, index) => (
            <motion.li
              key={item.id}
              className={`${styles.navItem} ${
                activeIndex === index + visibleNavIndex ? styles.activeNavItem : ''
              }`}
              onClick={() => handleTagClick(index + visibleNavIndex)}
              variants={horizontalSlide}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {item.title}
            </motion.li>
          ))}
      </div>

      {/* Card Content with two cards in view */}
      <div className={styles.cardContainer}>
        {vendorData.cardContent
          // Display only two cards around the active card
          .filter((_, index) => Math.abs(index - activeIndex) <= 1)
          .map((card) => (
            <motion.div
              key={card.id}
              className={`${styles.card} ${
                card.id - 1 === activeIndex ? styles.activeCard : ''
              }`}
              variants={slideAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={styles.cardHeader}>
                <card.icon className={styles.icon} />
                <p className={styles.headerText}>{card.headerText}</p>
              </div>
              <p>{card.content}</p>
              <ul className={styles.features}>
                {card.features.map((feature, i) => (
                  <li key={i} style={{ color: '#2ecc71' }}>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default Snap;
