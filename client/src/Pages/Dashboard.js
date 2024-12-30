// React Core Imports
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { updateProfileImage, logoutUser, fetchProfileImage } from "../redux/actions/authActions";

// API Imports
import { uploadImage } from "../API/upload";

// Icon Imports
import { FaCamera, FaSignOutAlt } from "react-icons/fa";

// UI Components and Styles
// eslint-disable-next-line 
import { DashboardCard, DashboardCardContent } from "../components/UI/dashboardCard";
import styles from "../css/LoginDashboard.module.css";

// Utility Imports
import { formatProfilePicPath } from "../frontendUtils/pathFormatter";


// Asset Imports
import food1 from "../asset/img/Menu/Alcohol.webp";
import food2 from "../asset/img/Menu/Alcohol.webp";
import food3 from "../asset/img/Menu/Alcohol.webp";
import food4 from "../asset/img/Menu/Alcohol.webp";

// Constants
const VENDORS = [
  { name: "Vendor 1", image: food1 },
  { name: "Vendor 2", image: food2 },
  { name: "Vendor 3", image: food3 },
  { name: "Vendor 4", image: food4 },
];



// Constants
const DEFAULT_IMAGE = "http://localhost:5000/uploads/dashboardDefault/drgnimages.jpeg";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extract data from persist:auth as single source of truth
  const persistAuth = JSON.parse(localStorage.getItem("persist:auth"));
  const isAuthenticated = persistAuth?.isAuthenticated === "true";
  const userData = JSON.parse(persistAuth?.user || "{}");
  const accessToken = userData?.accessToken || null;
  const username = userData?.username || null;

  // Redux Profile Pic (synchronized with backend)
  const reduxProfilePic = useSelector((state) => state.auth?.user?.profilePic);

  useEffect(() => {
    console.log("Authentication state:", isAuthenticated);
  }, [isAuthenticated]);

  // State Management
  const [profilePicture, setProfilePicture] = useState(DEFAULT_IMAGE);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadBorderColor, setUploadBorderColor] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  console.group("Dashboard Component");
  console.log("isAuthenticated:", isAuthenticated);
  console.log("User Data from persist:auth:", userData);
  console.log("Access Token:", accessToken);
  console.groupEnd();

  // Fetch profile image on mount
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfileImage());
    }
  }, [dispatch, isAuthenticated]);

  // Sync Profile Picture with Redux or Local Storage
  useEffect(() => {
    const updatedProfilePic = formatProfilePicPath(
      reduxProfilePic || userData?.profilePic || DEFAULT_IMAGE
    );
    setProfilePicture(updatedProfilePic);
  }, [reduxProfilePic, userData?.profilePic]);

  
  // Logout Handler
  const handleLogout = useCallback(() => {
    console.log("Logout Initiated"); // Debug: Logout start

    // Clear all localStorage items including persist:vendor
    [
      "user",
      "persist:user",
    ].forEach((key) => localStorage.removeItem(key));

    dispatch(logoutUser());
    window.location.href = "/login";
  }, [dispatch]);

  // File Upload Handler
  const handleFileChange = useCallback(
    async (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      if (!accessToken) {
        console.error("No Access Token Found. Please log in again.");
        setUploadStatus("Authentication Failed. Please log in again.");
        return;
      }
  
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      const maxSize = 5 * 1024 * 1024; // 5MB
  
      if (!validTypes.includes(file.type) || file.size > maxSize) {
        setUploadStatus("Invalid file. Max 5MB, jpeg/png/gif/webp allowed.");
        setUploadBorderColor("orangered");
        return;
      }
  
      setIsUploading(true);
      try {

        // Create a temporary URL for immediate preview
        const previewUrl = URL.createObjectURL(file);
        setProfilePicture(previewUrl); // Show preview immediately

        // Upload the image
        const responseData = await uploadImage(file, accessToken);
        const profilePic = responseData?.profilePic;
  
        console.log("Image Upload Successful. New Profile Pic:", profilePic);
  
        // Update Redux and local state immediately
        dispatch(updateProfileImage(profilePic));
        setProfilePicture(formatProfilePicPath(profilePic)); // Update local state instantly
  
        setUploadStatus("Image uploaded successfully!");
        setUploadBorderColor("green");
        URL.revokeObjectURL(previewUrl);
      } catch (error) {
        console.error("Image Upload Error:", error);
        setUploadStatus("Upload failed. Please try again.");
        setUploadBorderColor("orangered");
         // Revert to previous image on error
        setProfilePicture(formatProfilePicPath(reduxProfilePic || userData?.profilePic || DEFAULT_IMAGE));
      } finally {
        setIsUploading(false);
        setTimeout(() => setUploadStatus(""), 3000);
      }
    },
    // eslint-disable-next-line
    [accessToken, dispatch]
  );

  // Render Unauthorized View
  if (!isAuthenticated) {
    return (
      <div className={styles.unauthorizedContainer}>
        <h2>Welcome to Our Platform</h2>
        <p>Please log in to access your dashboard.</p>
        <button onClick={() => navigate("/login")} className={styles.loginButton}>
          Login Now
        </button>
      </div>
    );
  }

// Main Dashboard Render
return (
  <div className={styles.dashboardContainer}>
    {isUploading && (
      <div className={styles.spinnerOverlay}>
        <div className={styles.spinner} />
      </div>
    )}

    {/* Profile Section */}
    <div className={styles.profileSection}>
      <div className={styles.profileImageWrap} style={{ border: uploadBorderColor }}>
        <img
          src={profilePicture}
          alt="Profile"
          className={styles.profileImage}
          onError={() => setProfilePicture(DEFAULT_IMAGE)}
        />
        <label htmlFor="fileUpload" className={styles.cameraIcon}>
          <input type="file" id="fileUpload" hidden onChange={handleFileChange} />
          <FaCamera />
        </label>
      </div>
      <h2 className={styles.userName}>
          {username ? `Hi ${username}` : 'Hi Guest'}
        </h2>
      <p className={styles.uploadStatus}>{uploadStatus}</p>
    </div>

    {/* Vendors Section */}
    <div className={styles.vendorsSection}>
      <h2 className={styles.vendorsTitle}>Favorite Vendors</h2>
      <div className={styles.vendorsGrid}>
        {VENDORS.map((vendor) => (
          <DashboardCard key={vendor.name} className={styles.primaryCard}>
            <img
              src={vendor.image}
              alt={vendor.name}
              className={styles.cardImage}
            />
              <h3>{vendor.name}</h3>
          </DashboardCard>
          
        ))}
      </div>
    </div>

    {/* Logout Button */}
    <button onClick={handleLogout} className={styles.logoutButton}>
      <FaSignOutAlt /> Logout 
    </button>
  </div>
);
};

export default Dashboard;
