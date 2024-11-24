//client/src/reducers/authReducer.js
import {
  LOGIN,
  LOGOUT,
  VENDOR_LOGIN_SUCCESS,
  VENDOR_LOGOUT,
  UPDATE_PROFILE_IMAGE,
} from '../constants/actionTypes';

const initialState = {
  user: {
    username: '',
    email: '',
    address: '',
    city: '',
    profileImage: '',
    token: '',
  },
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    case VENDOR_LOGIN_SUCCESS:
      return {
        ...state,
        user: { ...action.payload },
        isAuthenticated: true,
      };

    case LOGOUT:
    case VENDOR_LOGOUT:
      return { ...initialState };

    case UPDATE_PROFILE_IMAGE:
      return {
        ...state,
        user: { ...state.user, profileImage: action.payload },
      };

    default:
      return state;
  }
};

export default authReducer;
