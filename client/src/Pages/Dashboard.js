import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCamera, FaSignOutAlt } from 'react-icons/fa';
import debounce from 'lodash.debounce';

// UI Components and Styles
import { DashboardCard, DashboardCardContent } from '../components/UI/dashboardCard';
import styles from '../css/Dashboard.module.css';

// Redux Actions
import { 
  updateProfileImage, 
  logoutUser, 
  fetchProfileImage 
} from '../redux/actions/authActions';

// Assets
import defaultProfileImage from '../asset/img/user5.webp';
import food1 from '../asset/img/food1.jpg';
import food2 from '../asset/img/food2.jpg';
import food3 from '../asset/img/food3.jpg';
import food4 from '../asset/img/food4.jpg';

// Sample vendor data
const VENDORS = [
  { name: 'Vendor 1', image: food1 },
  { name: 'Vendor 2', image: food2 },
  { name: 'Vendor 3', image: food3 },
  { name: 'Vendor 4', image: food4 }
];

/**
 * Handles image upload to the server
 * @param {File} file - The file to upload
 * @returns {Promise<Object>} The server response with the file path
 */

// Custom hook to upload image
const useUploadImage = () => {
  const token = useSelector((state) => state.auth.user?.token);
  
  const uploadImage = async (file) => {
    if (!token) {
      throw new Error('No token found');
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    return response.json(); // Assuming response has a 'filePath' or similar key
  };

  return uploadImage;
};

/**
 * Dashboard Component
 * Displays user profile, profile image upload functionality, and vendor listings
 */
const Dashboard = () => {
  const dispatch = useDispatch();

  // Redux State
  const entireState = useSelector(state => state);
  const user = useSelector((state) => state.auth.user);
  const { username, profileImage } = user;

  //custom hook for image upload
  const uploadImage = useUploadImage();
  // Local State
  const [imageError, setImageError] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadBorderColor, setUploadBorderColor] = useState('');
  const [previewUrl, setPreviewUrl] = useState(defaultProfileImage);
  const [isUploading, setIsUploading] = useState(false);

  // Debug logging
  console.log('Entire Redux State:', entireState);
  console.log('User:', user);
  console.log('Selected File:', selectedFile);

  /**
   * Handles image loading errors by setting default image
   */
  const handleImageError = useCallback(() => {
    setImageError(true);
    setPreviewUrl(defaultProfileImage);
  }, []);

  /**
   * Debounced image upload handler
   */
  // eslint-disable-next-line
  const handleUpload = useCallback(
    debounce(async (file) => {
      setIsUploading(true);
      try {
        const response = await uploadImage(file);
        dispatch(updateProfileImage(response.filePath)); // Assuming response contains filePath
        setUploadStatus('Image uploaded successfully!');
        setUploadBorderColor('green');
      } catch (error) {
        setUploadStatus('Image upload failed. Please try again.');
        setUploadBorderColor('orangered');
      } finally {
        setIsUploading(false);
        setTimeout(() => setUploadStatus(''), 3000); // Reset status after 3 seconds
      }
    }, 300),
    [dispatch, uploadImage] // Memoize the handleUpload function with dependencies
  );

  /**
   * Handles file selection and validation
   */
  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type) || file.size > maxSize) {
        setUploadStatus('Invalid file. Please select an image (max 5MB).');
        setUploadBorderColor('orangered');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);

      setSelectedFile(file);
      handleUpload(file);
    },
    [handleUpload]
  );

  /**
   * Handles user logout
   */
  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    window.location.href = '/login';
  }, [dispatch]);

  // Effects
  useEffect(() => {
    dispatch(fetchProfileImage());
  }, [dispatch]);

  useEffect(() => {
    if (profileImage) {
      setPreviewUrl(profileImage);
    }
  }, [profileImage]);

  return (
    <div className={styles.dashboardContainer}>
      {/* Profile Section */}
      <div className={styles.profileSection}>
        <div
          className={styles.profileImageContainer}
          style={{ border: uploadBorderColor ? `2px solid ${uploadBorderColor}` : 'none' }}
        >
          <img 
            src={imageError ? defaultProfileImage : previewUrl} 
            alt="Profile" 
            className={styles.profileImage}
            onError={handleImageError}
          />
          {isUploading && <div className={styles.spinner} />}
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
        <h2 className={styles.profileName}>
          {username ? `Hi ${username}` : 'Hi Guest'}
        </h2>
        {uploadStatus && <div className={styles.uploadStatus}>{uploadStatus}</div>}
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

export default Dashboard;