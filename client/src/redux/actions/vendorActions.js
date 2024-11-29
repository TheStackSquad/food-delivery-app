// client/src/redux/actions/vendorActions.js
import axios from 'axios';
import {
  VENDOR_LOGIN,
  VENDOR_LOGIN_SUCCESS,
  VENDOR_LOGIN_FAILURE,
  VENDOR_LOGOUT,
  CLEAR_ERROR,
} from '../constants/actionTypes';

// Action to initiate the login process
export const loginVendor = (formData) => async (dispatch) => {
  try {
    dispatch({ type: VENDOR_LOGIN });

    // Make API call to login endpoint
    const response = await axios.post('/api/vendor/login', formData);

    const { token, vendor, sessionData } = response.data;
    console.log({ token, vendor, sessionData });

    // Dispatch successful login action
    dispatch({
      type: VENDOR_LOGIN_SUCCESS,
      payload: {
        token,
        vendor,
        sessionData,
      },
    });

    // Save token to localStorage
    localStorage.setItem('vendorToken', token);
  } catch (error) {
    console.error('Error logging in vendor:', error);
    dispatch({
      type: VENDOR_LOGIN_FAILURE,
      payload: error.response?.data?.error || 'Something went wrong',
    });
  }
};

// Action to log out vendor
export const logoutVendor = () => (dispatch) => {
  // Clear token and any persisted data
  localStorage.removeItem('vendorToken');
  dispatch({ type: VENDOR_LOGOUT });
};

// Action to clear error messages
export const clearError = () => ({
  type: CLEAR_ERROR,
});
