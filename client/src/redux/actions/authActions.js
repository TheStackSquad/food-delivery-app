// client/src/redux/actions/authActions.js
import axios from 'axios';
import { LOGIN,
  LOGOUT,
  UPDATE_PROFILE_IMAGE,
  // eslint-disable-next-line
  FETCH_PROFILE_IMAGE } from '../constants';


// Improved action creator with logging
export const loginUser = (userData) => {
  // Validate userData for username and token instead
  if (!userData || !userData.username || !userData.token) {
    console.error('Invalid userData:', userData);
    throw new Error('Invalid userData: Missing username or token.');
  }

  // Log the payload before dispatching
  console.log(`[ACTION LOG]: Dispatching LOGIN action at ${new Date().toISOString()}`);
  console.log('Payload:', userData);

  return {
    type: LOGIN,
    payload: userData,
  };
};



// Action to log out the user
export const logoutUser = () => {
  console.log('[LOGOUT] Logging out user at', new Date().toISOString());
  return {
    type: LOGOUT,
  };
};


// Action to update the user profile image
export const updateProfileImage = (imageUrl) => {
  if (!imageUrl) {
    console.error('[UPDATE_PROFILE_IMAGE] Invalid imageUrl:', imageUrl);
    return;
  }

  console.log('[UPDATE_PROFILE_IMAGE] Updating profile image:', imageUrl);
  return {
    type: UPDATE_PROFILE_IMAGE,
    payload: imageUrl,
  };
};

// Action to fetch the profile image from the server
export const fetchProfileImage = () => async (dispatch, getState) => {
  try {
    // Get the token from Redux state
    const { token } = getState().auth.user;
    
    const response = await axios.get('/api/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,  // Add token to request headers
        'Content-Type': 'application/json'
      }
    });

    dispatch({
      type: 'UPDATE_PROFILE_IMAGE',
      payload: response.data.profileImage
    });
  } catch (error) {
    console.error('[FETCH_PROFILE_IMAGE] Error:', error);
  }
};






