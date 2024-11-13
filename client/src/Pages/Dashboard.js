import React from 'react';
import { FaCamera } from 'react-icons/fa';
import { DashboardCard, DashboardCardContent } from '../components/UI/dashboardCard';
import styles from '../css/Dashboard.module.css';

// Import images from the asset folder
import food1 from '../asset/img/food1.jpg';
import food2 from '../asset/img/food2.jpg';
import food3 from '../asset/img/food3.jpg';
import food4 from '../asset/img/food4.jpg';

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Profile Picture and Name */}
      <div className={styles.profileSection}>
        <div className={styles.profileImageContainer}>
          <img
            src="/api/placeholder/120/120"
            alt="Profile"
            className={styles.profileImage}
          />
          <button className={styles.cameraButton}>
            <FaCamera className={styles.cameraIcon} />
          </button>
        </div>
        <h2 className={styles.profileName}>John Doe</h2>
      </div>

      {/* Favorite Vendors */}
      <div className={styles.vendorsSection}>
        <h2 className={styles.vendorsTitle}>Favorite Vendors</h2>
        <div className={styles.vendorsGrid}>
          {[ // Use imported images here
            { name: 'Vendor 1', image: food1 },
            { name: 'Vendor 2', image: food2 },
            { name: 'Vendor 3', image: food3 },
            { name: 'Vendor 4', image: food4 },
          ].map((vendor) => (
            <DashboardCard key={vendor.name}>
              <img
                src={vendor.image}
                alt={vendor.name}
                className={styles.cardImage}
              />
              <DashboardCardContent className={styles.cardContent}>
                <h3>{vendor.name}</h3>
              </DashboardCardContent>
            </DashboardCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
