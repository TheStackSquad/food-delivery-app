// client/src/redux/reducers/vendorReducer.js
import {
  VENDOR_LOGIN,
  VENDOR_LOGIN_SUCCESS,
  VENDOR_LOGIN_FAILURE,
  VENDOR_LOGOUT,
  CLEAR_ERROR,
  UPDATE_VENDOR_PROFILE,
  VENDOR_ADD_MENU_ITEM,
  VENDOR_UPDATE_MENU_ITEM,
  VENDOR_REMOVE_MENU_ITEM,
  VENDOR_UPDATE_SESSION_MEALS,
  SET_AUTH,
} from "../constants/actionTypes";

const initialState = {
  vendorData: null, // Entire vendor object, including tokens and sessionData
  isAuthenticated: false,
  loading: false,
  error: null,
};

const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case VENDOR_LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case VENDOR_LOGIN_SUCCESS:
      console.log("Reducer Login Success - Payload:", action.payload);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        vendorData: action.payload, // Entire vendorData payload
        error: null,
      };

    case VENDOR_LOGOUT:
      return {
        ...state,
        vendorData: null,
        isAuthenticated: false,
        loading: false,
      };

    // vendorReducer.js
    case UPDATE_VENDOR_PROFILE:
      return {
        ...state,
        vendorData: JSON.stringify({
          ...JSON.parse(state.vendorData || "{}"),
          sessionData: {
            ...JSON.parse(state.vendorData || "{}").sessionData,
            profile: action.payload,
          },
        }),
        isAuthenticated: state.isAuthenticated,
      };

    case VENDOR_UPDATE_SESSION_MEALS:
      return {
        ...state,
        vendorData: {
          ...state.vendorData,
          sessionData: {
            ...state.vendorData.sessionData,
            meals: action.payload,
          },
        },
      };

    case VENDOR_ADD_MENU_ITEM:
      return {
        ...state,
        vendorData: {
          ...state.vendorData,
          sessionData: {
            ...state.vendorData.sessionData,
            meals: [...state.vendorData.sessionData.meals, action.payload],
          },
        },
      };

    case VENDOR_UPDATE_MENU_ITEM:
      return {
        ...state,
        menu: state.menu.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };

    case VENDOR_REMOVE_MENU_ITEM:
      return {
        ...state,
        vendorData: {
          ...state.vendorData,
          sessionData: {
            ...state.vendorData.sessionData,
            meals: state.vendorData.sessionData.meals.filter(
              (item) => item._id !== action.payload
            ),
          },
        },
      };

    case VENDOR_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false, // Reset authentication status
        error: action.payload,
      };

    case SET_AUTH:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default vendorReducer;
