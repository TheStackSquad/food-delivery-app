// src/GlobalLayout/layout.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { FaBell, FaCaretDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutContext } from './LayoutContext';
import ChatWidget from '../components/ChatWidget';
import '../css/layout.css';
import { itemVariants } from '../Motion/animation'; // Import itemVariants

function GlobalLayout() {
  const navigate = useNavigate(); // Create navigate instance
  const {
    isOpen,
    toggleDropdown,
    isChatIconVisible,
    isChatOpen,
    setIsChatOpen,
    setIsChatIconVisible,
  } = useContext(LayoutContext);

  // Debugging: Check state values on each render
  console.log('Dropdown open state:', isOpen);
  console.log('Chat icon visible state:', isChatIconVisible);
  console.log('Chat open state:', isChatOpen);

  // Function to handle dropdown item clicks and redirect
  const handleDropdownClick = (path) => {
    navigate(path); // Redirect to the specified path
    toggleDropdown(); // Close the dropdown after selection
  };

  return (
    <div className="global-layout">
      <div className="header">
        <div className="caret" onClick={() => {
          toggleDropdown(); // Call the toggle function
          console.log('Caret icon clicked, toggleDropdown called');
        }}>
          <FaCaretDown />
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="dropdown"
                initial={{ opacity: 0, y: -10 }} // Start slightly above
                animate={{ opacity: 1, y: 0 }} // Slide down to original position
                exit={{ opacity: 0, y: -10 }} // Slide up when exiting
              >
                {/* Dropdown items */}
                <motion.div className="dropdown-item" variants={itemVariants} initial="initial" animate="animate" exit="exit" onClick={() => handleDropdownClick('/')}>Home</motion.div>
                <motion.div className="dropdown-item" variants={itemVariants} initial="initial" animate="animate" exit="exit" onClick={() => handleDropdownClick('/account')}>Account</motion.div>
                <motion.div className="dropdown-item" variants={itemVariants} initial="initial" animate="animate" exit="exit" onClick={() => handleDropdownClick('/menu')}>Menu</motion.div>
                <motion.div className="dropdown-item" variants={itemVariants} initial="initial" animate="animate" exit="exit" onClick={() => handleDropdownClick('/logout')}>Logout</motion.div>
                <motion.div className="dropdown-item" variants={itemVariants} initial="initial" animate="animate" exit="exit" onClick={() => handleDropdownClick('/care-center')}>Care Center</motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="bell">
          <FaBell />
        </div>
      </div>
      {/* Render ChatWidget if chat icon is visible */}
      {isChatIconVisible && (
        <ChatWidget isOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
      )}
    </div>
  );
}

export default GlobalLayout;
