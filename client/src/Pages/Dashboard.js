// client/src/Pages/Dashboard.js

import React, { useState, useCallback } from 'react';
import { FaCamera } from 'react-icons/fa';
import { DashboardCard, DashboardCardContent } from '../components/UI/dashboardCard';
import styles from '../css/Dashboard.module.css';
import food1 from '../asset/img/food1.jpg';
import food2 from '../asset/img/food2.jpg';
import food3 from '../asset/img/food3.jpg';
import food4 from '../asset/img/food4.jpg';
import ProfilePictureUpload from './UploadProfilePicture';

//axios API logic
import { uploadImage } from '../API/upload';

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadBorderColor, setUploadBorderColor] = useState('');
  const [previewUrl, setPreviewUrl] = useState('/api/placeholder/120/120');

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        setUploadStatus('Please select a valid image file (JPG, PNG, or GIF)');
        setUploadBorderColor('orangered');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setUploadStatus('File size must be less than 5MB');
        setUploadBorderColor('orangered');
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setUploadStatus('Please select a file to upload');
      setUploadBorderColor('orangered');
      return;
    }

    try {
      const response = await uploadImage(selectedFile);
      setUploadStatus('Image uploaded successfully!');
      setUploadBorderColor('green');

      setTimeout(() => {
        setUploadBorderColor('');
      }, 3000);
    } catch (error) {
      console.error('Upload failed', error);
      setUploadStatus('Image upload failed, please try again');
      setUploadBorderColor('orangered');

      setTimeout(() => {
        setUploadBorderColor('');
      }, 3000);
    }
  }, [selectedFile]);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.profileSection}>
        <div
          className={styles.profileImageContainer}
          style={{ border: uploadBorderColor ? `2px solid ${uploadBorderColor}` : 'none' }}
        >
          <img src={previewUrl} alt="Profile" className={styles.profileImage} />
          <label htmlFor="fileInput" className={styles.cameraButton}>
            <FaCamera className={styles.cameraIcon} />
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <h2 className={styles.profileName}>John Doe</h2>
        {uploadStatus && (
          <div className={styles.uploadStatus} style={{ color: uploadBorderColor }}>
            {uploadStatus}
          </div>
        )}
      </div>

      <div className={styles.vendorsSection}>
        <h2 className={styles.vendorsTitle}>Favorite Vendors</h2>
        <ProfilePictureUpload />
        <div className={styles.vendorsGrid}>
          {[
            { name: 'Vendor 1', image: food1 },
            { name: 'Vendor 2', image: food2 },
            { name: 'Vendor 3', image: food3 },
            { name: 'Vendor 4', image: food4 },
          ].map((vendor) => (
            <DashboardCard key={vendor.name}>
              <img src={vendor.image} alt={vendor.name} className={styles.cardImage} />
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
