import React, { useContext, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart,
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaUtensils,
  FaMoneyCheckAlt,
  FaSignInAlt,
  FaPhone } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutContext } from './LayoutContext';
import { slideVariants, menuItemVariants } from '../Motion/animation';
import '../css/layout.css';

function GlobalLayout({ children }) {
  const navigate = useNavigate();
  const slideRef = useRef(null);

  // LayoutContext usage restricted to GlobalLayout
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
        <h3 className='brand'>Dev-Kitchen</h3>

        <div className='iconsGrid'>
          <div ref={slideRef} className="relative z-50">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown();
              }}
              className="togglebuttonLayout"
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
    { path: '/', label: 'Home', icon: <FaHome />, color: 'orchid' },
    { path: '/account', label: 'Account', icon: <FaUser />, color: 'deepskyblue' },
    { path: '/menu', label: 'Menu', icon: <FaUtensils />, color: 'tomato' },
    { path: '/payment', label: 'Payments', icon: <FaMoneyCheckAlt />, color: 'limegreen' },
    { path: '/login', label: 'Login', icon: <FaSignInAlt />, color: 'goldenrod' },
    { path: '/contact', label: 'Reach Us', icon: <FaPhone />, color: 'slateblue' },
  ].map((item) => (
    <motion.div
      key={item.path}
      variants={menuItemVariants}
      className="dropdown-item"
      onClick={() => handleMenuClick(item.path)}
    >
      {/* Apply individual color to icon */}
      <span className="icon" style={{ color: item.color }}>
        {item.icon}
      </span>
      <span className="label">{item.label}</span>
    </motion.div>
  ))}
</div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
