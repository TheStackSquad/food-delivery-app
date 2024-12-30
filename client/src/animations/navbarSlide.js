// components/animations/navbarSlide.js
import { motion } from 'framer-motion';
import styles from '../css/slideNav.module.css';

export const NavbarSlide = ({ selectedIndex }) => {
  const itemWidths = [33.3, 33.3, 33.3]; // Assuming there are 3 items, adjust width accordingly
  
  return (
    <motion.div
      initial={{ width: 0, left: '0%' }}
      animate={{
        width: `${itemWidths[selectedIndex]}%`,
        left: `${selectedIndex * 33.3}%`
      }}
      exit={{ width: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={styles['navbar-background']}
    />
  );
};
