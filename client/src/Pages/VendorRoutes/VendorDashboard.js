//client/src/Pages/VendorRoutes/VendorDashboard.js
import React, { useState, useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useSelector } from "react-redux";

// UI Components and Styles
import { DashboardCard, DashboardCardContent } from '../../components/UI/dashboardCard';
import styles from '../../css/Dashboard.module.css';

// Assets
import defaultProfileImage from '../../asset/img/user5.webp';
import food1 from '../../asset/img/food1.jpg';
import food2 from '../../asset/img/food2.jpg';
import food3 from '../../asset/img/food3.jpg';
import food4 from '../../asset/img/food4.jpg';

// Sample vendor data for the dashboard
const VENDORS = [
  { name: 'Vendor 1', image: food1 },
  { name: 'Vendor 2', image: food2 },
  { name: 'Vendor 3', image: food3 },
  { name: 'Vendor 4', image: food4 },
];

const VendorDashboard = () => {
  const vendorData = useSelector((state) => state.auth.user);

  // Extracting sessionData and fullname
  const sessionData = vendorData?.sessionData || {};
  console.log('session data:', sessionData);
  const vendorProfile = sessionData.vendor || {};
  const { fullname } = vendorProfile;
  const { profileImage } = vendorProfile;

  // Local State for image error handling
  const [imageError, setImageError] = useState(false);

  // Handle image error and use default profile image
  const handleImageError = () => {
    setImageError(true);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear localStorage on logout
    localStorage.removeItem('vendorFullname');
    window.location.href = '/login';  // Simplified for this example
  };

  // Store fullname in localStorage and retrieve it
  useEffect(() => {
    if (fullname) {
      localStorage.setItem('vendorFullname', fullname); // Store fullname
    }
  }, [fullname]); // Update only when fullname changes

  // Retrieve fullname from localStorage if not available in vendorData
  const storedFullname = localStorage.getItem('vendorFullname');
  const displayName = fullname || storedFullname || 'Hi Vendor';

  return (
    <div className={styles.dashboardContainer}>
      {/* Profile Section */}
      <div className={styles.profileSection}>
        <div className={styles.profileImageContainer}>
          <img
            src={imageError ? defaultProfileImage : profileImage || defaultProfileImage}
            alt="Profile"
            className={styles.profileImage}
            onError={handleImageError}
          />
        </div>
        <h2 className={styles.profileName}>
          {displayName}
        </h2>
      </div>

      {/* Vendors Section */}
      <div className={styles.vendorsSection}>
        <h2 className={styles.vendorsTitle}>Favorite Vendors</h2>
        <div className={styles.vendorsGrid}>
          {VENDORS.map((vendor) => (
            <DashboardCard key={vendor.name}>
              <img src={vendor.image} alt={vendor.name} className={styles.cardImage} />
              <DashboardCardContent>
                <h3>{vendor.name}</h3>
              </DashboardCardContent>
            </DashboardCard>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className={styles.logoutContainer} onClick={handleLogout}>
        <FaSignOutAlt className={styles.logoutIcon} />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default VendorDashboard;

