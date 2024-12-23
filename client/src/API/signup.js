//client/ src/API/signup.js
import apiClient from '../frontendUtils/apiClient';
const debug = require('debug')('client:api:signup'); // Debug instance for logging


export const signUpUser = async (formData, endpoint = '/user/signup') => {
  try {
    debug(`[signUpUser] Called with formData to endpoint: ${endpoint}`, formData);

    const response = await apiClient.post(endpoint, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Allow cookies for session management
    });
    console.log('Whats In The Response:', response);

    debug('[signUpUser] Response received:', response.data);
    return response.data;
  } catch (error) {
    // Log detailed error information
    debug(`[signUpUser] Signup error to ${endpoint}:`, error.response || error);

    // Rethrow a user-friendly error message
    throw new Error(error.response?.data?.error || 'Sign-up failed. Please try again.');
  }
};

export const riderSignUpUser = async (formData, endpoint = '/rider/signup') => {
  console.log("API Call Initiated:", { endpoint, formData });

  try {
    const response = await apiClient.post(endpoint, formData, {
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

export const vendorSignUpUser = async (formData, endpoint = '/vendor/signup') => {
  try {
    debug(`[vendorSignUpUser] Called with formData to endpoint: ${endpoint}`, formData);
    
    const response = await apiClient.post(endpoint, formData, {
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

export const vendorProfile = async (formData, endpoint = '/vendor/profile', token) => {
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
    const response = await apiClient.post(endpoint, formData, config);

    console.log('Response Data From SignUp:', response.data);
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


export const vendorAddMenu = async (formData, endpoint = '/vendor/addmenu', token) => {
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
    // Send POST request
    const response = await apiClient.post(endpoint, formData, config);

    console.log('Response Data:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error adding menu item:', error);
    throw error;
  }
}