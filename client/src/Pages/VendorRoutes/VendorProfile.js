// src/Pages/VendorRoutes/Profile.js

import React, { useState } from 'react';
import { FaStore, FaCamera, FaChevronDown } from 'react-icons/fa';
import styles from '../../css/Profile.module.css';

function Profile() {
  const [showCoverInfo, setShowCoverInfo] = useState(false);

  return (
    <div className={styles.profileContainer}>

<div className={styles.profileWrap}>
      {/* Profile Picture Section */}
      <div className={styles.profilePictureSection}>
        <div className={styles.profilePicture}>
          <FaStore size={50} />
          <FaCamera className={styles.cameraIcon} />
        </div>
      </div>

      {/* Store Information Section */}
      <div className={styles.storeInfoSection}>
        <label>Store Name</label>
        <input type="text" placeholder="Enter store name" className={styles.input} />
        
        <label>Description</label>
        <input type="text" placeholder="Enter store description" className={styles.input} />
      </div>

      {/* Cover Image Section */}
      <div className={styles.coverImageSection}>
        <div className={styles.coverLabel}>
          <label>Cover Image</label>
          <span className={styles.infoToggle} onClick={() => setShowCoverInfo(!showCoverInfo)}>
            What is this? <FaChevronDown />
          </span>
        </div>
        {showCoverInfo && (
          <p className={styles.coverInfoText}>
            Upload a high-quality image of your top menu item to entice hungry customers.
          </p>
        )}
        <div className={styles.uploadBox}>
          <FaCamera size={30} />
          <p>Upload Image</p>
        </div>
        <p className={styles.formatNote}>Allowed formats: .jpg & .png, less than 1MB</p>
      </div>

      {/* Additional Information Section */}
      <div className={styles.additionalInfoSection}>
        <label>Vendor Type</label>
        <input type="text" placeholder="Enter vendor type" className={styles.input} />

        <label>Official Email</label>
        <input type="email" placeholder="Enter email" className={styles.input} />

        <label>Official Phone Number</label>
        <input type="tel" placeholder="Enter phone number" className={styles.input} />

        <label>Address</label>
        <input type="text" placeholder="Enter address" className={styles.input} />
      </div>

      {/* Save Changes Button */}
      <button className={styles.saveButton}>Save Changes</button>
    </div>
    </div>
  );
}

export default Profile;
