import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import deliveryService from '../asset/img/deliveryService.webp';
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
            <h1>Deliver. Earn. Grow.</h1>
            <img src={deliveryService} alt="deliveryImage" className={styles.deliveryImage} />
        </div>
    );
};

export default Rider;
