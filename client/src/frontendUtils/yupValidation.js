import * as Yup from 'yup';

// Custom validation for phone number
const phoneRegExp = /^[0-9]{10}$/;

// Custom validation for store name and description to allow multiple words
const multiWordValidation = Yup.string()
  .trim()
  .min(2, 'Must be at least 2 characters')
  .max(100, 'Must be 100 characters or less')
  .matches(/^[a-zA-Z0-9\s,.'-]+$/, 'Only alphanumeric characters and common punctuation allowed');

// Validation schema for vendor profile
export const vendorProfileSchema = Yup.object().shape({
  storeName: multiWordValidation.required('Store name is required'),
  
  storeDescription: multiWordValidation.required('Store description is required'),
  
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .max(100, 'Email must be 100 characters or less'),
  
  address: Yup.string()
    .trim()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be 200 characters or less')
    .required('Address is required'),
  
  profileImage: Yup.mixed()
    .test('fileSize', 'Image must be less than 5MB', (value) => {
      if (!value) return true; // Skip if no file
      return value.size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Unsupported image format', (value) => {
      if (!value) return true; // Skip if no file
      const supportedFormats = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      return supportedFormats.includes(value.type);
    }),
  
  coverImage: Yup.mixed()
    .test('fileSize', 'Image must be less than 5MB', (value) => {
      if (!value) return true; // Skip if no file
      return value.size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Unsupported image format', (value) => {
      if (!value) return true; // Skip if no file
      const supportedFormats = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      return supportedFormats.includes(value.type);
    })
});

// Function to handle form validation with toast notifications
export const validateVendorProfile = async (values) => {
  try {
    // Validate the entire schema
    await vendorProfileSchema.validate(values, { abortEarly: false });
    return { 
      isValid: true, 
      errors: {} 
    };
  } catch (error) {
    // Organize errors by field
    const errors = error.inner.reduce((acc, curr) => {
      acc[curr.path] = curr.message;
      return acc;
    }, {});

    return { 
      isValid: false, 
      errors 
    };
  }
};

// Toastify configuration for consistent error handling
export const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Utility function to display validation errors via Toastify
export const displayValidationErrors = (errors, toast) => {
  Object.values(errors).forEach(errorMsg => {
    toast.error(errorMsg, toastConfig);
  });
};