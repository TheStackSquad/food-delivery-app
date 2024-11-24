// src/GlobalLayout/layout.js
import React, { useCallback, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaHome, FaUser, FaUtensils, FaMoneyCheckAlt, FaSignInAlt, FaPhone } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDropdown, updateInteraction, hideChatIcon } from '../redux/actions/layoutActions';  // Use the new hideChatIcon action
import { slideVariants, menuItemVariants } from '../Motion/animation';
import '../css/layout.css';

function GlobalLayout({ children }) {
  const navigate = useNavigate();
  const slideRef = useRef(null);

  // Accessing state from Redux store
   // eslint-disable-next-line
  const { isOpen, isChatIconVisible } = useSelector((state) => state.layout);  // Select state
  const dispatch = useDispatch();

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (slideRef.current && !slideRef.current.contains(event.target)) {
        dispatch(toggleDropdown(false));
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          dispatch(toggleDropdown(false));
        }
      };
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, dispatch]);

 
  const handleMenuClick = useCallback((path, isSpecial) => {
    if (isSpecial) {
      dispatch(updateInteraction());
      setTimeout(() => {
        dispatch(hideChatIcon()); // Hide chat icon after 10 seconds of no interaction
      }, 10000); // 10 seconds timeout
    } else {
      navigate(path);
    }
    dispatch(toggleDropdown(false));
  }, [navigate, dispatch]);

  return (
    <div className="global-layout">
      <div className="header">
        <Link to="/">
          <h3 className="brand">Dev-Kitchen</h3>
        </Link>

        <div className="iconsGrid">
          <div ref={slideRef} className="relative z-50">
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(toggleDropdown(!isOpen));  // Toggle menu state
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
            <div className="cart-icon" onClick={() => dispatch(updateInteraction())}>
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
