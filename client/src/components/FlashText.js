// src/components/FlashText.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import texts from '../data/text';
import '../css/flashText.css';

const FlashText = () => {
  const [currentText, setCurrentText] = React.useState(0);

  // Cycle through texts with a delay
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prevText) => (prevText + 1) % texts.length);
    }, 4000); // Change text every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flash-text-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={texts[currentText]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.9 }}
          className="flash-text"
        >
          {texts[currentText]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FlashText;
