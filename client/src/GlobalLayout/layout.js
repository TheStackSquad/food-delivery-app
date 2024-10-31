import React, { useContext, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutContext } from './LayoutContext';
import { slideVariants, menuItemVariants } from '../Motion/animation';
import '../css/layout.css';

function GlobalLayout({ children }) {
  const navigate = useNavigate();
  const slideRef = useRef(null);
  const {
    isOpen,
    toggleDropdown,
    setIsOpen,
    setIsChatIconVisible,
    updateInteraction
  } = useContext(LayoutContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (slideRef.current && !slideRef.current.contains(event.target)) {
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

  const handleMenuClick = useCallback((path, isSpecial) => {
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
        {/* Left side - Image */}
  
        <h3 className='brand'>Dev-Kitchen</h3>

        {/* Center - Menu and Dropdown */}
        <div className='icons-grid'>
        <div ref={slideRef} className="relative z-50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown();
              updateInteraction();
            }}
            className="toggle-button"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={slideVariants}
                className="menu"
              >
                <div className="px-4 space-y-4 navigation-menu">
                  {[
                    { path: '/', label: 'Home' },
                    { path: '/account', label: 'Account' },
                    { path: '/menu', label: 'Menu' },
                    { path: '/payment', label: 'Payments' },
                    { path: '/contact', label: 'Care Center' },
                  ].map((item) => (
                    <motion.div
                      key={item.path}
                      variants={menuItemVariants}
                      className="dropdown-item"
                      onClick={() => handleMenuClick(item.path)}
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right side - Icons */}
        <div className="icons-container">
          <div className="cart-icon" onClick={updateInteraction}>
            <FaShoppingCart />
          </div>
        </div>
        </div>
      </div>

      {children}
    </div>
  );
}

export default GlobalLayout;
