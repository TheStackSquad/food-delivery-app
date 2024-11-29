//client/ src/API/signup.js
import axios from 'axios'; // For making HTTP requests
const debug = require('debug')('client:api:signup'); // Debug instance for logging

export const signUpUser = async (formData, endpoint = '/api/signup') => {
  try {
    debug(`[signUpUser] Called with formData to endpoint: ${endpoint}`, formData);

    const response = await axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Allow cookies for session management
    });

    debug('[signUpUser] Response received:', response.data);
    return response.data;
  } catch (error) {
    // Log detailed error information
    debug(`[signUpUser] Signup error to ${endpoint}:`, error.response || error);

    // Rethrow a user-friendly error message
    throw new Error(error.response?.data?.error || 'Sign-up failed. Please try again.');
  }
};

export const riderSignUpUser = async (formData, endpoint = '/api/rider/signup') => {
  console.log("API Call Initiated:", { endpoint, formData });

  try {
    const response = await axios.post(endpoint, formData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.error || 'Sign-up failed. Please try again.'
    );
  }
};

export const vendorSignUpUser = async (formData, endpoint = '/api/vendor/signup') => {
  try {
    debug(`[vendorSignUpUser] Called with formData to endpoint: ${endpoint}`, formData);
    
    const response = await axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'application/json', // Ensure JSON payload
      },
      withCredentials: true, // Allow cookies for session management
    });

    debug('[vendorSignUpUser] Response received:', response.data);
    return response.data;
  } catch (error) {
    // Log detailed error information
    debug(`[vendorSignUpUser] Signup error to ${endpoint}:`, error.response || error);

    // Rethrow a user-friendly error message
    throw new Error(error.response?.data?.error || 'Sign-up failed. Please try again.');
  }
};

//client/ src/API/signup.js
export const vendorProfile = async (formData, endpoint = '/api/vendor/profile', token) => {
  console.log('vendorProfile Hit');
  try {
    debug(`[vendorProfile] Called with formData to endpoint: ${endpoint}`, formData);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`, // Include the token for authentication
      },
      withCredentials: true, // Allow cookies for session management
    };

    // Debug request details
    console.group('[API] Vendor Profile Update');
    console.log('Request Payload:', {
      profileData: formData.get('profile'),
      profileImageSize: formData.get('profileImage')?.size,
      coverImage: formData.get('coverImage')?.size,
    });


    // Send POST request
    const response = await axios.post(endpoint, formData, config);

    console.log('Response Data:', response.data);
    console.groupEnd();

    debug('[vendorProfile] Response received:', response.data);
    return response.data;
  } catch (error) {
    // Log detailed error information
    debug(`[vendorProfile] Error from ${endpoint}:`, error.response || error);
    console.group('[API] Vendor Profile Update Error');
    console.error('ERROR Details:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      errors: error.response?.data?.errors,
    });
    console.groupEnd();

    // Rethrow a user-friendly error message
    throw new Error(error.response?.data?.message || 'Profile update failed. Please try again.');
  }
};
