import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCamera, FaChevronDown } from 'react-icons/fa';

import { vendorProfileSchema, validateVendorProfile } from '../../frontendUtils/yupValidation';
import { vendorProfile } from '../../API/signup';
import styles from '../../css/VendorProfile.module.css';

const VendorProfile = () => {
//  const dispatch = useDispatch();
const [showCoverInfo, setShowCoverInfo] = useState(false);

const vendor = useSelector((state) => state.auth.user);
const vendorToken = useSelector((state) => state.auth.user.token);
const vendorId = useSelector((state) => state.auth.user.sessionData.vendor._id);
// const vendorEmail = useSelector((state) => state.auth.user.vendor.email);

console.log('vendor token:', vendorToken);
console.log('vendor state:', vendor);
console.log('vendor id:', vendorId);


  // Refs for file inputs
  const profileImageRef = useRef(null);
  const coverImageRef = useRef(null);

  // State management
  const [formData, setFormData] = useState({
    storeName: vendor?.storeName || '',
    storeDescription: vendor?.storeDescription || '',
    phoneNumber: vendor?.phoneNumber || '',
    email: vendor?.email || '',
    address: vendor?.address || '',
    profileImage: null,
    coverImage: null
  });

  const [previews, setPreviews] = useState({
    profileImage: vendor?.profileImageUrl || null,
    coverImage: vendor?.coverImageUrl || null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageValidation, setImageValidation] = useState({
    profileImage: true,
    coverImage: true
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`[FORM] Input Change: ${name} = ${value}`);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file selection
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) {
      console.warn(`[FORM] No file selected for ${type}`);
      return;
    }

    console.log(`[FORM] File Selected: ${type}`, {
      name: file.name,
      size: file.size,
      type: file.type
    });

    try {
      // Validate file using Yup
      vendorProfileSchema.validateAt(type, { [type]: file });
      
      setFormData(prev => ({
        ...prev,
        [type]: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => ({
          ...prev,
          [type]: reader.result
        }));
      };
      reader.readAsDataURL(file);

      // Update validation state
      setImageValidation(prev => ({
        ...prev,
        [type]: true
      }));
    } catch (error) {
      console.error(`[FORM] File Validation Error for ${type}:`, error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000
      });

      setImageValidation(prev => ({
        ...prev,
        [type]: false
      }));
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log('[FORM] Submission Started', { formData });

    try {
      // Validate form
      const { isValid, errors } = await validateVendorProfile(formData);

      if (!isValid) {
        Object.values(errors).forEach(error => 
          toast.error(error, {
            position: "top-right",
            autoClose: 3000
          })
        );
        setIsSubmitting(false);
        return;
      }

      // Prepare FormData for multipart upload
      const submitData = new FormData();
      
      // Append text fields as JSON
      submitData.append('profile', JSON.stringify({
        storeName: formData.storeName,
        storeDescription: formData.storeDescription,
        vendorType: formData.vendorType,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        address: formData.address
      }));
      console.log('SubmitData:', submitData.storeName);

      // Append images if exists
      if (formData.profileImage) {
        submitData.append('profileImage', formData.profileImage);
      }
      if (formData.coverImage) {
        submitData.append('coverImage', formData.coverImage);
      }

      // Call API + Include the vendorToken from Redux
    const response = await vendorProfile(submitData, '/api/vendor/profile', vendorToken);
      console.log('Check Response:', response);

      // Success handling
      toast.success('Profile Updated Successfully!', {
        position: "top-right",
        autoClose: 3000
      });

      // Potential Redux update
      // dispatch(updateVendorProfile(response.data))

       // Clear form fields but retain images
    setFormData((prevState) => ({
      profileImage: prevState.profileImage,
      coverImage: prevState.coverImage,
      storeName: "",
      storeDescription: "",
      vendorType: "",
      phoneNumber: "",
      email: "",
      address: "",
    }));
    
    } catch (error) {
      console.error('[FORM] Submission Error', error);
      toast.error(error.response?.data?.message || 'Profile Update Failed', {
        position: "top-right",
        autoClose: 3000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileWrap}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Profile Image Upload */}

        <div className={styles.imageWrap}>
        <div 
          className={`${styles.imageUpload} ${
            imageValidation.profileImage ? '' : styles.invalidImage
          }`}
          onClick={() => profileImageRef.current.click()}
        >
          {previews.profileImage ? (
            <img 
              src={previews.profileImage} 
              alt="Profile" 
              className={styles.previewImage}
            />
          ) : (
            <FaCamera className={styles.cameraIcon} />
          )}
          <input 
            type="file" 
            ref={profileImageRef}
            onChange={(e) => handleFileChange(e, 'profileImage')}
            accept="image/jpeg,image/png,image/jpg,image/webp"
            hidden 
          />
        </div>
        </div>

        {/* Form Fields */}
        <div className={styles.storeInfoSection}>
        <label>Store Name</label>
        <input 
          type="text"
          name="storeName"
          value={formData.storeName}
          onChange={handleInputChange}
          placeholder="Store Name"
          className={styles.input}
        />

<label>Store Description</label>
        <input type="text"
         name="storeDescription" 
        placeholder="Enter store description"
        value={formData.storeDescription}
          onChange={handleInputChange}
        className={styles.input} />
      </div>

      
         {/* Cover Image Upload Section */}
<div className={styles.coverImageWrap}>
  {/* Label and Toggle Section */}
  <div className={styles.coverLabel}>
    <label>Cover Image</label>
    <span className={styles.infoToggle} onClick={() => setShowCoverInfo(!showCoverInfo)}>
      What is this? <FaChevronDown />
    </span>
  </div>
  
  {/* Explanatory Message (Toggled) */}
  {showCoverInfo && (
    <p className={styles.coverInfoText}>
      Upload a high-quality image of your top menu item to entice hungry customers.
    </p>
  )}

  {/* Cover Image Upload Box */}
  <div
    className={`${styles.coverImageSection} ${
      imageValidation.coverImage ? '' : styles.invalidImage
    }`}
    onClick={() => coverImageRef.current.click()}
  >
    {previews.coverImage ? (
      <img
        src={previews.coverImage}
        alt="Cover"
        className={styles.coverPreview}
      />
    ) : (
      <div className={styles.uploadBox}>
        <FaCamera size={30} />
        <p>Upload Image</p>
      </div>
    )}
    <input
      type="file"
      ref={coverImageRef}
      onChange={(e) => handleFileChange(e, 'coverImage')}
      accept="image/jpeg,image/png,image/jpg,image/webp"
      hidden
    />
  </div>

  {/* Allowed Format Note */}
  <p className={styles.formatNote}>
    Allowed formats: .jpg & .png, less than 1MB
  </p>
</div>


         {/* Additional Information Section */}
      <div className={styles.additionalInfoSection}>
        <label>Vendor Type</label>
        <input type="text"
        placeholder="Enter vendor type"
        value={formData.vendorType}
        onChange={handleInputChange}
        className={styles.input} />

        <label>Official Email</label>
        <input type="email"
         name="email" 
        placeholder="Enter email"
        value={formData.email}
        onChange={handleInputChange}
        className={styles.input} />

        <label>Official Phone Number</label>
        <input type="tel"
         name="phoneNumber"
        placeholder="Enter phone number"
        value={formData.tel}
        onChange={handleInputChange}
        className={styles.input} />

        <label>Address</label>
        <input type="text"
         name="address" 
        placeholder="Enter address"
        value={formData.address}
        onChange={handleInputChange}
        className={styles.input} />
      </div>



      <div className={styles.btnWrap}>
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
        </button>
        </div>
      </form>
      <ToastContainer />
      </div>
    </div>
  );
};

export default VendorProfile;