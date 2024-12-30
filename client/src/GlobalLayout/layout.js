// src/GlobalLayout/layout.js
import React, { useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaHome, FaUser, FaUtensils, FaMoneyCheckAlt, FaSignInAlt, FaPhone } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDropdown, updateInteraction, hideChatIcon } from '../redux/actions/layoutActions';  // Use the new hideChatIcon action
import { slideVariants, menuItemVariants } from '../Motion/animation';
//import CartBadge from '../components/CartBadge';
import styles from '../css/layout.module.css';

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

  
const handleCartClick = () => {
  dispatch(updateInteraction());
  navigate('/checkout');
};

//navigate function to home page

const handleNavigation = () => {
  navigate("/");
};

  return (
    <div className={styles['global-layout']}>
       <div className={styles['header-brand']}>
       <h3 
      className={styles['brand']} 
      onClick={handleNavigation} 
      style={{ cursor: "pointer" }}
    >
      Dev-Kitchen
    </h3>
      
        

        <div className={styles['iconsGrid']}>
          <div ref={slideRef} className={styles["relative z-50"]}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(toggleDropdown(!isOpen));  // Toggle menu state
              }}
              className={styles["togglebuttonLayout"]}
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
                  className={styles["menu"]}
                >
                  <div className={styles["navigation-menu"]}>
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
                        className={styles["dropdown-item"]}
                        onClick={() => handleMenuClick(item.path)}
                      >
                        <span className={styles["icon"]} style={{ color: item.color }}>
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

          <div className={styles['icons-container']}>
          <div className={styles['cart-icon']} onClick={handleCartClick}>
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
