//src/components/Snap.js
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { horizontalSlide, enhancedCardAnimation } from '../animations/snapSlide';
import vendorData from '../data/VendorData';
import styles from '../css/Snap.module.css';

const Snap = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null); // Reference to the scrolling navbar container
  const navRefs = useRef([]); // Reference array for each nav item for observer tracking

  // Effect: Set up IntersectionObserver to update activeIndex based on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find the index of the intersecting element in the navRefs array
            const index = navRefs.current.indexOf(entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { root: scrollContainerRef.current, threshold: 0.7 }
    );

    // Observe each navItem for scrolling visibility
    navRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  // Effect: Duplicate navItems to create circular scroll illusion
  useEffect(() => {
    const container = scrollContainerRef.current;

    // Reset scroll position to start creating the loop effect
    const resetScroll = () => {
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0; // Reset scroll position to the start
      }
    };

    container.addEventListener('scroll', resetScroll);
    return () => container.removeEventListener('scroll', resetScroll);
  }, []);

  // Function: Change activeIndex when a navItem is clicked
  const handleTagClick = (index) => setActiveIndex(index);

  return (
    <div className={styles.snapContainer}>
      {/* Navbar with circular scroll */}
      <div className={`${styles.navbar} ${styles.scrollableNavbar}`} ref={scrollContainerRef}>
        {vendorData.liTags.concat(vendorData.liTags).map((item, index) => (
          <motion.li
            key={`${item.id}-${index}`} // Ensure unique keys
            ref={(el) => (navRefs.current[index % vendorData.liTags.length] = el)} // Track original items in the navRefs array
            className={`${styles.navItem} ${activeIndex === index % vendorData.liTags.length ? styles.activeNavItem : ''}`}
            onClick={() => handleTagClick(index % vendorData.liTags.length)}
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
              className={`${styles.card} ${card.id - 1 === activeIndex ? styles.activeCard : ''}`}
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
