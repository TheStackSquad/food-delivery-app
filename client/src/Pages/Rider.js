//client/src/Pages/Rider.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Rider.module.css'; // Import the CSS module

const Rider = () => {
  const navigate = useNavigate();

     useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/rider/signup'); // Redirect to signup page
        }, 3000);

        return () => clearTimeout(timer); // Cleanup timer
    }, [navigate]);

    return (
        <div className={styles.rider}>
              <div className={styles.riderGrid}>
              <h1 className={styles.riderPitch}>Deliver. Earn. Grow.</h1>
              </div>
        </div>
    );
};

export default Rider;