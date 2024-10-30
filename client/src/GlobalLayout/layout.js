//src/GlobalLayout/layout.js
import React, { useContext, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaCaretDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutContext } from './LayoutContext';
import { itemVariants } from '../Motion/animation';

function GlobalLayout({ children }) { // Added children prop
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const {
    isOpen,
    toggleDropdown,
    setIsOpen,
    setIsChatIconVisible,
    updateInteraction
  } = useContext(LayoutContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, setIsOpen]);

  const handleDropdownClick = useCallback((path, isSpecial) => {
    if (isSpecial) {
      setIsChatIconVisible(true);
      updateInteraction();
    } else {
      navigate(path);
    }
    setIsOpen(false);
  }, [navigate, setIsChatIconVisible, setIsOpen, updateInteraction]);

  return (
    <div className="global-layout">
      <div className="header">
        <div 
          ref={dropdownRef}
          className="caret" 
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
            updateInteraction();
          }}
        >
          <FaCaretDown />
          
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

        <div 
          className="bell"
          onClick={updateInteraction}
        >
          <FaBell />
        </div>
      </div>

      {/* Render children */}
      {children}
    </div>
  );
}

export default GlobalLayout;