// src/Pages/VendorRoutes/AddMenu.js
import React, { useState } from "react";
import styles from "../../css/VendorAddMenu.module.css";
import FoodIcon from "../../asset/img/rice-bowl.png";
import { FaChevronDown, FaCamera } from "react-icons/fa";

function AddMenu() {
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [showCoverInfo, setShowCoverInfo] = useState(false);

  const toggleForm = () => {
    setIsAddingMeal(true);
  };

  return (
    <div className={styles.container}>
      {isAddingMeal ? (
        <div className={styles.formContainer}>
          {/* Category Dropdown */}
          <div className={styles.inputGroup}>
            <label>Category</label>
            <div className={styles.dropdown}>
            <div className={styles.selectWrapper}>
              <select>
                <option>Ice Cream</option>
                <option>Bakery Delight</option>
                <option>Traditional</option>
                <option>Asian Cuisine</option>
                <option>Alcohol Beverages</option>
              </select>
              <FaChevronDown />
              </div>
              <button className={styles.addCategory}>+ Add Category</button>
            </div>
          </div>

          {/* Meal Name Input */}
          <div className={styles.inputGroup}>
            <label>Meal Name</label>
            <input
              type="text"
              placeholder="Meal name"
              className={styles.input}
            />
          </div>

          {/* Description Input */}
          <div className={styles.inputGroup}>
            <label>Description</label>
            <input
              type="text"
              placeholder="Meal description"
              className={styles.input}
            />
          </div>

          {/* Cover Image Upload Section */}
          <div className={styles.coverImageSection}>
            <div className={styles.coverLabel}>
              <label>Upload Meal Image</label>
              <span
                className={styles.infoToggle}
                onClick={() => setShowCoverInfo(!showCoverInfo)}
              >
                What is this? <FaChevronDown />
              </span>
            </div>
            {showCoverInfo && (
              <p className={styles.coverInfoText}>
                This is the menu image customers will see on their app.
              </p>
            )}
            <div className={styles.uploadBox}>
              <FaCamera size={30} />
              <p>Upload Image</p>
            </div>
            <p className={styles.formatNote}>
              Allowed formats: .jpg & .png, less than 1MB
            </p>
          </div>

          {/* Price and Additional Details */}
          <div className={styles.inputGroupForPrice}>
            <div className={styles.inputGroup}>
              <label>Price</label>
              <input type="number" className={styles.input} placeholder="₦" />
            </div>
            <div className={styles.inputGroup}>
              <label>Price Description</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Price per plate"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Pack</label>
            <input type="text" className={styles.input} />
          </div>

          {/* Stock Toggle */}
          <div className={styles.inputGroup}>
  <label className={styles.label}>
    <span className={styles.text}>Mark item in stock</span>
    <div className={styles.toggleSwitch}>
      <input type="checkbox" />
      <span className={styles.slider}></span>
    </div>
  </label>
</div>


          {/* Submit Button */}
          <button className={styles.submitButton}>Add Meal to Menu</button>
        </div>
      ) : (
        <div className={styles.centeredContainer}>
          <img src={FoodIcon} alt="foodIcon" className={styles.foodIcon} />
          <p className={styles.message}>You haven't added any meals yet</p>
          <button className={styles.button} onClick={toggleForm}>
            Add meals
          </button>
        </div>
      )}
    </div>
  );
}

export default AddMenu;
