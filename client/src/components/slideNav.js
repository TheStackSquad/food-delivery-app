import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { Button } from 'react-bootstrap';
import { NavbarSlide } from '../animations/navbarSlide';
import styles from '../css/slideNav.module.css';

const SlideNav = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // Track the selected index
  const navigate = useNavigate(); // Initialize navigate function for routing

  // Handle item click
  const handleItemClick = (index) => {
    setSelectedIndex(index);
  };

  // Render card content based on selectedIndex
  const renderCardContent = () => {
    switch (selectedIndex) {
      case 0:
        return (
          <div className={styles['button-section']}>
              <div className={styles['button-box']}>
            <div
              className={`${styles['custom-button']} ${styles['btn-1']}`}
              onClick={() => navigate('/menu')}
            >
              Skip
            </div>
            <div
              className={`${styles['custom-button']} ${styles['btn-2']}`}
              onClick={() => navigate('/login')}
            >
              Login Here
            </div>
             </div>
            <p className={styles['card-content']}>Login to get 15% off your order</p>
          </div>
        );
        case 1:
          return (
            <div className={styles['button-section']}>
            
              <div
                className={`${styles['custom-button']} ${styles['btn-2']}`}
                onClick={() => navigate('/vendor')}
              >
                Find Out More
              </div>
              <p className={styles['card-content']}>
                Accelerate your growth with effortless menu and order management,
                multi-branch support, streamlined team coordination,
                easy payouts, and so much more.
              </p>
              
            </div>
          );
        case 2:
          return (
            <div className={styles['button-section']}>
              <div
                className={`${styles['custom-button']} ${styles['btn-1']}`}
                onClick={() => navigate('/rider')}
              >
                Join Us
              </div>
              <p className={styles['card-content']}>
                Set your own hours, ride your favorite bike,
                track your progress, earn bonuses,
                and enjoy instant payouts straight to your account!
              </p>
            </div>
          );
        
      default:
        return <p className={styles['card-content']}>Please select an item.</p>;
    }
  };

  return (
    <div className={styles['navbar-container']}>
      <nav className={styles['navbar']}>
        <button className={styles['navbar-item']} onClick={() => handleItemClick(0)}>Customer</button>
        <button className={styles['navbar-item']} onClick={() => handleItemClick(1)}>Vendor</button>
        <button className={styles['navbar-item']} onClick={() => handleItemClick(2)}>Rider</button>
      </nav>
      <NavbarSlide selectedIndex={selectedIndex} /> {/* Animated background */}
      <div className={styles['card-container']}>
        {renderCardContent()}
      </div>
    </div>
  );
};

export default SlideNav;
