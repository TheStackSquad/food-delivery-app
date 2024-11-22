// client/src/redux/reducers/authReducer.js
const initialState = {
  user: {
    username: '',      // default username
    token: '',         // default token
    profileImage: '',  // default profileImage, empty string until uploaded
  },
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: {
          ...action.payload,  // action.payload should now include user data like username and token
          profileImage: '',   // ensure profileImage is part of the user object, default to ''
        },
        isAuthenticated: true,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: {
          username: '',
          token: '',
          profileImage: '',
        },
        isAuthenticated: false,
      };

    case 'UPDATE_PROFILE_IMAGE':
      return {
        ...state,
        user: {
          ...state.user,
          profileImage: action.payload,  // Update the profile image within the user object
        },
      };

    default:
      return state;
  }
};

export default authReducer;
