// src/components/Snap.js
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { horizontalSlide, enhancedCardAnimation } from '../animations/snapSlide';
import vendorData from '../data/VendorData';
import styles from '../css/Snap.module.css';

const Snap = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navRefs = useRef([]);

  // Update the activeIndex as each navItem scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = navRefs.current.indexOf(entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.7 }
    );

    navRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleTagClick = (index) => setActiveIndex(index);

  return (
    <div className={styles.snapContainer}>
      {/* Navbar with smooth scroll */}
      <div className={`${styles.navbar} ${styles.scrollableNavbar}`}>
        {vendorData.liTags.map((item, index) => (
          <motion.li
            key={item.id}
            ref={(el) => (navRefs.current[index] = el)}
            className={`${styles.navItem} ${
              activeIndex === index ? styles.activeNavItem : ''
            }`}
            onClick={() => handleTagClick(index)}
            variants={horizontalSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {item.title}
          </motion.li>
        ))}
      </div>

      {/* Card Content with enhanced animations */}
      <div className={styles.cardContainer}>
        {vendorData.cardContent
          .filter((_, index) => Math.abs(index - activeIndex) <= 1)
          .map((card) => (
            <motion.div
              key={card.id}
              className={`${styles.card} ${
                card.id - 1 === activeIndex ? styles.activeCard : ''
              }`}
              variants={enhancedCardAnimation}
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
