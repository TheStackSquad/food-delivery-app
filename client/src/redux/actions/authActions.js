// client/src/redux/actions/authActions.js
import apiClient from '../../frontendUtils/apiClient';


import {
  LOGIN,
  LOGOUT,
  // eslint-disable-next-line
  SET_LOADING,
  UPDATE_PROFILE_IMAGE,
} from '../constants/actionTypes';


// Login action for users
export const loginUser = (userData) => ({
  type: LOGIN,
  payload: userData, // Send the entire userData object
});

// Logout action for users 
export const logoutUser = () => ({
  type: LOGOUT,
});

// Update profile image
export const updateProfileImage = (profilePic) => ({
  type: UPDATE_PROFILE_IMAGE,
  payload: { profilePic } // Ensure the payload contains profilePic
});

// Fetch profile image
const dashboardApiUrl = '/user/login/dashboard';

export const fetchProfileImage = () => async (dispatch, getState) => {
  try {

    const user = getState().auth.user;
const token = user.accessToken; // Extract the token


    if (!token) throw new Error('User is not authenticated');

    console.log("Token in Redux fetchProfileImage:", token);

    const response = await apiClient.get(dashboardApiUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Extract profilePic
    const profilePic = response.data?.user?.profilePic || 
                       'default-profile-pic.webp';

    dispatch(updateProfileImage(profilePic));
  } catch (error) {
    console.error('Error fetching profile image:', error);
  }
};



