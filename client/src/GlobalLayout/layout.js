import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaBars } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ChatWidget from '../components/ChatWidget';
import { dropdownVariants, itemVariants } from '../Motion/animation';
import '../css/layout.css';

function GlobalLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatIconVisible, setIsChatIconVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();
  const hideIconTimerRef = useRef(null); // Use useRef to store timer ID

  useEffect(() => {
    if (isChatIconVisible && !isChatOpen) {
      hideIconTimerRef.current = setTimeout(() => {
        setIsChatIconVisible(false);
      }, 10000);
    }
    return () => clearTimeout(hideIconTimerRef.current); // Clear timer on component unmount or re-render
  }, [isChatIconVisible, isChatOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownClick = (path) => {
    if (path === '/care-center') {
      setIsChatIconVisible(true); // Show chat icon
      setIsChatOpen(false); // Ensure chat box is closed initially
    } else {
      navigate(path);
    }
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="global-layout">
      <div className="header">
        <div className="caret" onClick={toggleDropdown}>
          <FaBars />
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="dropdown"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={dropdownVariants}
              >
                <motion.div className="dropdown-item" variants={itemVariants} onClick={() => handleDropdownClick('/')}>Home</motion.div>
                <motion.div className="dropdown-item" variants={itemVariants} onClick={() => handleDropdownClick('/account')}>Account</motion.div>
                <motion.div className="dropdown-item" variants={itemVariants} onClick={() => handleDropdownClick('/menu')}>Menu</motion.div>
                <motion.div className="dropdown-item" variants={itemVariants} onClick={() => handleDropdownClick('/payment')}>Payments</motion.div>
                <motion.div className="dropdown-item" variants={itemVariants} onClick={() => handleDropdownClick('/logout')}>Logout</motion.div>
                <motion.div className="dropdown-item" variants={itemVariants} onClick={() => handleDropdownClick('/care-center')}>Care Center</motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="bell">
          <FaBell />
        </div>
      </div>
      {children}
      {isChatIconVisible && (
        <ChatWidget isOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        isChatIconVisible={isChatIconVisible} />
      )}
    </div>
  );
}

export default GlobalLayout;
