//client/ src/API/signup.js
import axios from 'axios'; // For making HTTP requests
const debug = require('debug')('client:api:signup'); // Debug instance for logging

/**
 * Sends sign-up data to the backend.
 * 
 * @param {Object} formData - The form data for the sign-up request.
 * @param {string} endpoint - The endpoint to send the request to (default: '/api/signup').
 * @returns {Object} The response data from the backend.
 */
export const signUpUser = async (formData, endpoint = '/api/signup') => {
  try {
    debug(`[signUpUser] Called with formData to endpoint: ${endpoint}`, formData);

    const response = await axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'application/json', // Ensure JSON payload
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


