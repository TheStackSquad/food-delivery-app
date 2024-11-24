// client/src/redux/actions/authActions.js
import axios from 'axios';
import {
  LOGIN,
  LOGOUT,
  VENDOR_LOGIN_SUCCESS,
  VENDOR_LOGOUT,
  // eslint-disable-next-line
  SET_LOADING,
  UPDATE_PROFILE_IMAGE,
} from '../constants/actionTypes';

// Login action for users
export const loginUser = (userData) => ({
  type: LOGIN,
  payload: userData,
});

// Logout action for users
export const logoutUser = () => ({
  type: LOGOUT,
});

// Vendor login action
export const loginVendor = (vendorData) => ({
  type: VENDOR_LOGIN_SUCCESS,
  payload: vendorData,
});

// Vendor logout action
export const logoutVendor = () => ({
  type: VENDOR_LOGOUT,
});

// Update profile image
export const updateProfileImage = (imageUrl) => ({
  type: UPDATE_PROFILE_IMAGE,
  payload: imageUrl,
});

// Fetch profile image
export const fetchProfileImage = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth.user;
    const response = await axios.get('/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(updateProfileImage(response.data.profileImage));
  } catch (error) {
    console.error('Error fetching profile image:', error);
  }
};

