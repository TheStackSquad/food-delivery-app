//client/src/reducers/authReducer.js
import {
  SET_LOADING,
  LOGIN,
  LOGOUT,
  UPDATE_PROFILE_IMAGE,
} from '../constants/actionTypes';

const initialState = {
  user: {
    username: '',
    email: '',
    address: '',
    city: '',
    profilePic: 'default-profile-pic.webp', // Default profile picture
  },
  token: '',
  refreshToken: '',
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
      case LOGIN:
        return {
          ...state,
          user: action.payload, // Store the entire user object
          isAuthenticated: true,
          loading: false,
        };
      case LOGOUT:
        return {
          ...state,
          user: initialState.user,
          isAuthenticated: false,
          loading: false,
        };

    case UPDATE_PROFILE_IMAGE:
      return {
        ...state,
        user: { ...state.user,
          profilePic: action.payload.profilePic || 'default-profile-pic.webp', }, // Update only profilePic
      };


    default:
      return state;
  }
};

export default authReducer;