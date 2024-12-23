// client/src/Pages/VendorRoutes/AddMenu.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import styles from "../../css/VendorAddMenu.module.css";
import { addMenuValidationSchema} from '../../frontendUtils/yupValidation';
import { addMenuItemAsync } from '../../redux/actions/vendorActions';

 // eslint-disable-next-line
//import placeholderImage from '../../asset/img/protectedRoute.webp';
import FoodIcon from "../../asset/img/rice-bowl.png";
import { FaChevronDown, FaCamera } from "react-icons/fa";

import '../../css/ProtectedRoute.css';

function AddMenu() {
  const dispatch = useDispatch();
  const vendor = JSON.parse(localStorage.getItem("vendorData"));
  const accessToken = vendor?.accessToken || null;
  const vendorId = vendor?.sessionData?.vendor?._id || null;


console.log("Vendor:", vendor);
console.log("VendorToken AddMenu:", accessToken);
console.log("VendorId AddMenu:", vendorId);


  
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [showCoverInfo, setShowCoverInfo] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  //Vendor State
  console.log('vendor state:', vendor);

  const toggleForm = () => {
  setIsAddingMeal(prev => !prev);
  console.log('Toggle form called, new state will be:', !isAddingMeal);
};
  //Submit Function
  const formik = useFormik({
    initialValues: {
      category: '',
      mealName: '',
      description: '',
      image: null,
      price: '',
      priceDescription: '',
      pack: '',
      inStock: true,
    },
    validationSchema: addMenuValidationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      console.log('🟢 [onSubmit] Starting submission');
      try {
        setSubmitting(true);
        const formData = new FormData();
  
        // Add form fields to FormData
        Object.keys(values).forEach((key) => {
          if (key === 'image' && values[key]) {
            console.log(`📁 Adding file "${key}" to formData`);
            formData.append(key, values[key]);
          } else if (key !== 'image') {
            console.log(`📋 Adding field "${key}" with value "${values[key]}" to formData`);
            formData.append(key, values[key]);
          }
        });
  
        formData.append('vendorId', vendorId);
        console.log('📤 [onSubmit] Dispatching addMenuItemAsync');
  
        const result = await dispatch(addMenuItemAsync(formData, accessToken));
        console.log('📥 [Dispatch Result]:', result);
  
        if (result.meal) {
          console.log('✅ [onSubmit] Menu item added successfully');
          toast.success('Menu item added successfully!');
           // Clear preview image
        setPreviewImage(null);
  
          // Reset the form
          resetForm({
            values: {
              category: '',
              mealName: '',
              description: '',
              image: null,
              price: '',
              priceDescription: '',
              pack: '',
              inStock: true,
            }
          });
          console.log('🧹 [onSubmit] Form reset');
  
          // Transition back to the initial state
          setIsAddingMeal(false); // Return to "Add meals" UI
          console.log('🔄 [onSubmit] Returned to centered container');
        } else {
          throw new Error(result.error || 'Failed to add menu item');
        }
      } catch (error) {
        console.error('❌ [onSubmit] Error:', error);
        toast.error(error.response?.data?.error || 'Failed to add menu item');
      } finally {
        setSubmitting(false);
        console.log('✅ [onSubmit] Submission complete');
      }
    },
  });
  

 // Handle image file selection and preview
 const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    formik.setFieldValue("image", file);

    // Preview image using FileReader
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  }
};

useEffect(() => {
  console.log('isAddingMeal state changed:', isAddingMeal);
}, [isAddingMeal]);

return ( 
  <div className={styles.container}>
      <div className={styles.vendorContainer}>
        {isAddingMeal ? (
          <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
            {/* Category Dropdown */}
            <div className={styles.inputGroup}>
              <label>Category</label>
              <div className={styles.dropdown}>
                <div className={styles.selectWrapper}>
                  <select
                    name="category"
                    onChange={formik.handleChange}
                    value={formik.values.category}
                  >
                    <option value="">Select Category</option>
                    <option value="Ice Cream">Ice Cream</option>
                    <option value="Bakery Delight">Bakery Delight</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Asian Cuisine">Asian Cuisine</option>
                    <option value="Alcohol Beverages">Alcohol Beverages</option>
                  </select>
                  <FaChevronDown />
                </div>
                <button type="button" className={styles.addCategory}>
                  + Add Category
                </button>
              </div>
              {formik.touched.category && formik.errors.category && (
                <div className={styles.error}>{formik.errors.category}</div>
              )}
            </div>

            {/* Meal Name Input */}
            <div className={styles.inputGroup}>
              <label>Meal Name</label>
              <input
                type="text"
                name="mealName"
                placeholder="Meal name"
                className={styles.input}
                onChange={formik.handleChange}
                value={formik.values.mealName}
              />
              {formik.touched.mealName && formik.errors.mealName && (
                <div className={styles.error}>{formik.errors.mealName}</div>
              )}
            </div>

            {/* Description Input */}
            <div className={styles.inputGroup}>
              <label>Description</label>
              <input
                type="text"
                name="description"
                placeholder="Meal description"
                className={styles.input}
                onChange={formik.handleChange}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description && (
                <div className={styles.error}>{formik.errors.description}</div>
              )}
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
              <div className={styles.uploadWrap}>
                <div
                  className={styles.uploadBox}
                  onClick={() => document.getElementById("imageUpload").click()}
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className={styles.previewImage}
                    />
                  ) : (
                    <>
                      <FaCamera size={30} />
                      <p>Upload Image</p>
                    </>
                  )}
                </div>
              </div>

              <input
                type="file"
                id="imageUpload"
                name="image"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <p className={styles.formatNote}>
                Allowed formats: .jpg & .png, less than 5MB
              </p>
              {formik.touched.image && formik.errors.image && (
                <div className={styles.error}>{formik.errors.image}</div>
              )}
            </div>

            {/* Price and Additional Details */}
            <div className={styles.inputGroupForPrice}>
              <div className={styles.inputGroup}>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  className={styles.input}
                  placeholder="₦"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                />
                {formik.touched.price && formik.errors.price && (
                  <div className={styles.error}>{formik.errors.price}</div>
                )}
              </div>
              <div className={styles.inputGroup}>
                <label>Price Description</label>
                <input
                  type="text"
                  name="priceDescription"
                  className={styles.input}
                  placeholder="Price per plate"
                  onChange={formik.handleChange}
                  value={formik.values.priceDescription}
                />
                {formik.touched.priceDescription &&
                  formik.errors.priceDescription && (
                    <div className={styles.error}>
                      {formik.errors.priceDescription}
                    </div>
                  )}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Pack</label>
              <input
                type="text"
                name="pack"
                className={styles.input}
                onChange={formik.handleChange}
                value={formik.values.pack}
              />
              {formik.touched.pack && formik.errors.pack && (
                <div className={styles.error}>{formik.errors.pack}</div>
              )}
            </div>

            {/* Stock Toggle */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <span className={styles.text}>Mark item in stock</span>
                <div className={styles.toggleSwitch}>
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formik.values.inStock}
                    onChange={() =>
                      formik.setFieldValue("inStock", !formik.values.inStock)
                    }
                  />
                  <span className={styles.slider}></span>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`${styles.submitButton} ${formik.isSubmitting ? styles.disabled : ''}`}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Adding..." : "Add Meal to Menu"}
            </button>
          </form>
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
  </div>
);


}

export default AddMenu;