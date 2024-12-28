// client/src/Pages/VendorRoutes/VendorDashboard.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { Modal } from "../../components/UI/dashboardCard";

// Redux Actions
import {
  logoutVendor,
  deleteMenuItem,
} from "../../redux/actions/vendorActions";

// Utilities
import {
  formatImagePath,
  formatProfilePicPathVendor,
} from "../../frontendUtils/pathFormatter";

// UI Components
import {
  DashboardCard,
  DashboardCardContent,
  DashboardWrap,
} from "../../components/UI/dashboardCard";

// Styles
import styles from "../../css/Dashboard.module.css";
import "../../css/ProtectedRoute.css";

// Constants
const DEFAULT_PROFILE_IMAGE =
  "http://localhost:5000/uploads/dashboardDefault/drgnimages.jpeg";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeCardId, setActiveCardId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [dashboardData, setDashboardData] = React.useState({
    profile: {},
    mealsData: [],
  });
  const [accessToken, setAccessToken] = React.useState(null);

  // Use useSelector to fetch data from the Redux store
  const vendorData = useSelector((state) => state.vendor.vendorData);

  useEffect(() => {
    if (!vendorData) {
      console.log("No vendor data found in the Redux store.");
      return;
    }

    try {
      // Extracting required data from vendorData
      const profile = vendorData?.sessionData?.profile || {};
      const mealsData = vendorData?.sessionData?.meals || [];
      const token = vendorData?.accessToken || null;

      console.log("Extracted Profile:", profile);
      console.log("Extracted Meals:", mealsData);
      console.log("Extracted Token:", token);

      // Setting state with the extracted data
      setDashboardData({ profile, mealsData });
      setAccessToken(token);
    } catch (error) {
      console.error("Error processing vendor data:", error);
    }
  }, [vendorData]);

  // Initial delete click handler
  const handleDeleteClick = (mealId) => {
    console.log("Delete initiated for meal:", mealId);
    setActiveCardId(mealId);
  };

  // Confirmation handler
  const handleConfirmDelete = async () => {
    console.log("🚀 [handleConfirmDelete] Starting deletion process");
    setIsDeleting(true);

    try {
      const vendorState = JSON.parse(localStorage.getItem("persist:vendor"));
      //   const vendorId = JSON.parse(vendorState.vendorData)?.sessionData?._id;
      const vendorId = JSON.parse(vendorState.vendorData)?.sessionData?.vendor
        ?._id;
      console.log("Token In Dashboard (From State):", accessToken);
      console.log("📦 [handleConfirmDelete] Parsed data:", {
        vendorId,
        activeCardId,
        hasToken: accessToken,
      });
      console.log(
        "✅ [handleConfirmDelete] Deletion result (TOKEN):",
        accessToken
      );

      const result = await dispatch(
        deleteMenuItem(activeCardId, accessToken, vendorId)
      );

      console.log("✅ [handleConfirmDelete] Deletion result:", result);

      if (result.success) {
        setActiveCardId(null);
        console.log("✨ [handleConfirmDelete] Successfully deleted menu item");
      } else {
        console.error(
          "❌ [handleConfirmDelete] Failed to delete:",
          result.error
        );
      }
    } catch (error) {
      console.error("💥 [handleConfirmDelete] Error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Edit button click handler
  const handleEditClick = (meal) => {
    console.log("[Dashboard] Edit clicked for meal:", meal._id);
    navigate(`/vendor/editmenu/${meal._id}`, { state: { meal } });
  };
  
  const handleLogout = () => {
    [
      "vendorData",
      "token",
      "refreshToken",
      "vendor",
      "vendorToken",
      "persist:vendor",
    ].forEach((key) => localStorage.removeItem(key));

    dispatch(logoutVendor());
    navigate("/vendor/login");
    console.log("Vendor logged out successfully.");
  };

  const handleImageError = (e) => {
    console.error("Image Load Error:", e.target.src);
    e.target.src = DEFAULT_PROFILE_IMAGE;
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Profile Section */}
      <div className={styles.profileSection}>
        <div className={styles.profileImageContainer}>
          <img
            src={
              formatProfilePicPathVendor(
                dashboardData.profile.profileImagePath
              ) || DEFAULT_PROFILE_IMAGE
            }
            alt="Profile"
            className={styles.profileImage}
            onError={handleImageError}
          />
          <p className={styles.storeName}>
            {dashboardData.profile.storeName || "Vendor Name"}
          </p>
          <p className={styles.storeDescription}>
            {dashboardData.profile.storeDescription || "Store Description"}
          </p>
        </div>
        <div className={styles.brandSection}>
          {/* Logout Button */}
          <div
            className={styles.logoutContainer}
            onClick={handleLogout}
            role="button"
            tabIndex={0}
          >
            <FaSignOutAlt /> Logout
          </div>
        </div>
      </div>

      {/* Meals Section */}
      <div className={styles.mealsSection}>
        {dashboardData.mealsData.map((meal) => {
          console.log("Rendered Meal:", meal);
          return (
            <DashboardCard key={meal._id} className={styles.dashboardCard}>
              <LazyLoadImage
                src={formatImagePath(meal.image)}
                alt={meal.mealName}
                effect="blur"
                className={styles.cardImage}
              />
              <DashboardCardContent>
                <h3 className={styles.mealName}>{meal.mealName}</h3>
                <p className={styles.mealDesc}>{meal.description}</p>
                <p className={styles.mealPrice}>Price: ${meal.price}</p>
              </DashboardCardContent>
              <DashboardWrap>
                <p>Metric...</p>
                <div className={styles.iconContainer}>
                  <AiOutlineEdit
                    className={styles.editIcon}
                    onClick={() => handleEditClick(meal)}
                  />
                  <AiOutlineDelete
                    className={styles.deleteIcon}
                    onClick={() => handleDeleteClick(meal._id)}
                  />
                  {activeCardId === meal._id && (
                    <Modal
                      isOpen={true}
                      onClose={() => setActiveCardId(null)}
                      onConfirm={handleConfirmDelete}
                      isDeleting={isDeleting}
                    />
                  )}
                </div>
                <p className={styles.cardSeen}>Sale: </p>
                <p className={styles.cardSeen}>Seen: </p>
                <p className={styles.cardInteractions}>Interactions: </p>
              </DashboardWrap>
            </DashboardCard>
          );
        })}
      </div>
    </div>
  );
};

export default VendorDashboard;
