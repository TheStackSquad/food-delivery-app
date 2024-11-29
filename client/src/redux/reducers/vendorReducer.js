// client/src/redux/reducers/vendorReducer.js
import {
    VENDOR_LOGIN,
    VENDOR_LOGIN_SUCCESS,
    VENDOR_LOGIN_FAILURE,
    VENDOR_LOGOUT,
    CLEAR_ERROR,
  } from '../constants/actionTypes';
  
  const initialState = {
    vendor: null,
    sessionData: null,
    token: null,
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
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          vendor: action.payload.vendor,
          sessionData: action.payload.sessionData,
          token: action.payload.token,
          error: null,
        };
  
      case VENDOR_LOGIN_FAILURE:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          error: action.payload,
        };
  
      case VENDOR_LOGOUT:
        return {
          ...state,
          vendor: null,
          sessionData: null,
          token: null,
          isAuthenticated: false,
          loading: false,
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
  