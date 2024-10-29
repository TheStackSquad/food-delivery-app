import React, { useContext, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaCaretDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutContext } from './LayoutContext';
import ChatWidget from '../components/ChatWidget';
import '../css/layout.css';
import { itemVariants } from '../Motion/animation';

// Dropdown menu items configuration
const MENU_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/account', label: 'Account' },
  { path: '/menu', label: 'Menu' },
  { path: '/logout', label: 'Logout' },
  { path: '/care-center', label: 'Care Center', special: true }
];

function GlobalLayout() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const {
    isOpen,
    toggleDropdown,
    setIsOpen, // We'll need this to directly close the dropdown
    setIsChatIconVisible,
    updateInteraction
  } = useContext(LayoutContext);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Add event listener only when dropdown is open
      document.addEventListener('mousedown', handleClickOutside);
      // Add escape key listener
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };
      document.addEventListener('keydown', handleEscape);

      // Cleanup
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, setIsOpen]);

  // Handle dropdown item clicks
  const handleDropdownClick = useCallback((path, isSpecial) => {
    if (isSpecial) {
      setIsChatIconVisible(true);
      updateInteraction();
    } else {
      navigate(path);
    }
    setIsOpen(false); // Directly close dropdown instead of toggle
  }, [navigate, setIsChatIconVisible, setIsOpen, updateInteraction]);

  // Dropdown item component
  const DropdownItem = ({ path, label, special }) => (
    <motion.div
      className="dropdown-item"
      variants={itemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={() => handleDropdownClick(path, special)}
    >
      {label}
    </motion.div>
  );

  return (
    <div className="global-layout">
      <div className="header">
        {/* Dropdown trigger */}
        <div 
          ref={dropdownRef}
          className="caret" 
          onClick={(e) => {
            e.stopPropagation(); // Prevent event from bubbling
            toggleDropdown();
            updateInteraction();
          }}
        >
          <FaCaretDown />
          
          {/* Dropdown menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <motion.div className="dropdown-item" variants={itemVariants} onClick={() => handleDropdownClick('/')}>Home</motion.div>
                <motion.div className="dropdown-item" variants={itemVariants} onClick={() => handleDropdownClick('/account')}>Account</motion.div>
                <motion.div className="dropdown-item" variants={itemVariants} onClick={() => handleDropdownClick('/menu')}>Menu</motion.div>
                <motion.div className="dropdown-item" variants={itemVariants} onClick={() => handleDropdownClick('/payment')}>Payments</motion.div>
                <motion.div className="dropdown-item" variants={itemVariants} onClick={() => handleDropdownClick('/logout')}>Logout</motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notification bell */}
        <div 
          className="bell"
          onClick={updateInteraction}
        >
          <FaBell />
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}

export default GlobalLayout;