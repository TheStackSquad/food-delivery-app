//client/src/RiderRoutes/RiderProfile.js
import React, { useState } from 'react';
import { FaUser, FaCamera } from 'react-icons/fa';
import styles from '../../css/RiderProfile.module.css';

function RiderProfile() {
  const [deliveryMode, setDeliveryMode] = useState('bicycle');

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileWrap}>
        {/* Profile Picture Section */}
        <div className={styles.profilePictureSection}>
          <div className={styles.profilePicture}>
            <FaUser size={50} />
            <FaCamera className={styles.cameraIcon} />
          </div>
        </div>

        {/* Rider Information Section */}
        <div className={styles.riderInfoSection}>
          <label htmlFor="fullName" className={styles.label}>
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            className={styles.input}
          />

          <label htmlFor="address" className={styles.label}>
            Address
          </label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            className={styles.input}
          />

          <label htmlFor="phone" className={styles.label}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter phone number"
            className={styles.input}
          />

          <label htmlFor="age" className={styles.label}>
            Age
          </label>
          <input
            type="number"
            id="age"
            placeholder="Enter age"
            className={styles.input}
          />

          <label htmlFor="deliveryMode" className={styles.label}>
            Delivery Mode
          </label>
          <select
            id="deliveryMode"
            className={styles.input}
            value={deliveryMode}
            onChange={(e) => setDeliveryMode(e.target.value)}
          >
            <option value="car">Car</option>
            <option value="bicycle">Bicycle</option>
            <option value="bike">Bike</option>
          </select>
        </div>

        {/* Save Changes Button */}
        <button className={styles.saveButton}>Save Changes</button>
      </div>
    </div>
  );
}

export default RiderProfile;
