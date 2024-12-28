// client/src/redux/actions/vendorActions.js
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
} from '../constants/actionTypes';

import apiClient from '../../frontendUtils/apiClient';


// Action to initiate the login process
export const loginVendorAction = (vendorData) => (dispatch) => {
  dispatch({ type: VENDOR_LOGIN });
  try {
    dispatch({
        type: VENDOR_LOGIN_SUCCESS,
        payload: vendorData, // Pass entire vendorData
    });
  } catch (error) {
    // Dispatch login failure in case of an error
    dispatch({
      type: VENDOR_LOGIN_FAILURE,
      payload: error.message || 'Login failed',
    });
  }
};

// Action to log out vendor
export const logoutVendor = () => (dispatch) => {
  // Clear token and any persisted data
  localStorage.removeItem('userData');

  // Dispatch actions for logout and session failure
  dispatch({ type: VENDOR_LOGOUT });
};

// Action to clear error messages
export const clearError = () => ({
  type: CLEAR_ERROR,
});

// vendorActions for profile updates
export const updateVendorProfile = (profile) => {
  return {
    type: UPDATE_VENDOR_PROFILE,
    payload: profile
  };
};

// In vendorActions.js
export const addMenuItem = (menuItem) => ({
  type: VENDOR_ADD_MENU_ITEM,
  payload: menuItem,
});

export const updateMenuItem = (menuItem) => ({
  type: VENDOR_UPDATE_MENU_ITEM,
  payload: menuItem,
});

export const removeMenuItem = (menuItemId) => ({
  type: VENDOR_REMOVE_MENU_ITEM,
  payload: menuItemId,
});

// Async action for adding menu item
export const updateSessionMeals = (meals) => ({
  type: VENDOR_UPDATE_SESSION_MEALS,
  payload: meals,
});

//Api post for vendor add menu
export const addMenuItemAsync = (formData, token) => async (dispatch) => {
  console.log('🚀 [addMenuItemAsync] Starting API call to add menu item');
  console.log('📤 [addMenuItemAsync] FormData contents:', Array.from(formData.entries()));
  
  try {
    console.log('⏳ [addMenuItemAsync] Sending POST request to /vendor/addmenu');

    const response = await apiClient.post('/vendor/addmenu', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 [addMenuItemAsync] API Response:', {
      status: response.status,
      data: response.data,
    });

    const newMenuItem = response.data.meal;
    console.log('🍴 [addMenuItemAsync] New Menu Item:', newMenuItem);

    // Dispatch action to add menu item to menu array
    dispatch(addMenuItem(newMenuItem));
    console.log('✅ [addMenuItemAsync] Dispatched addMenuItem action');
    return response.data;
  } catch (error) {
    console.error('❌ [addMenuItemAsync] Error adding menu item:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const updateMenuItemAsync = (formData, token) => async (dispatch) => {
  console.log('📄 [updateMenuItemAsync Hit....]');
  try {
    // Configuring headers for authentication and file upload
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
    console.log('📄 [Request Config]:', config);

    // Extract meal ID from formData
    const mealId = formData.get('mealId');
    console.log('📄 [Meal ID]:', mealId);

    if (!mealId) {
      throw new Error('Meal ID is required to update a menu item.');
    }

    console.log('🟢 [updateMenuItemAsync] Starting update for meal ID:', mealId);

    // Sending PUT request to update the menu item
    const { data } = await apiClient.put(`/vendor/editmenu/${mealId}`, formData, config);

    console.log('✅ [updateMenuItemAsync] Menu item updated successfully:', data);

    // Dispatch action to update Redux state
    dispatch(updateMenuItem(data));

    return data; // Returning updated data to the caller
  } catch (error) {
    console.error('❌ [updateMenuItemAsync] Error updating menu item:', error);

    // Handle errors
    return {
      error: error.response?.data?.message || error.message,
    };
  }
};

// deleteMenuItem action
export const deleteMenuItem = (menuItemId, token, vendorId) => async (dispatch) => {
  console.log('🚀 [deleteMenuItem] Starting API call with:', {
    menuItemId,
    vendorId,
    hasToken: !!token
  });
  
  try {
    // Updated URL to match the route definition
    console.log(`📤 [deleteMenuItem] Sending DELETE request to: /vendor/dashboard/${menuItemId}`);

    
    // The path should match your backend route structure: /api/vendor/dashboard/:id
    const url = `/vendor/dashboard/${menuItemId}`;
    console.log(`📤 [deleteMenuItem] Sending DELETE request to: ${url}`);
    
    const response = await apiClient.delete(`/vendor/dashboard/${menuItemId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { vendorId },
    });
    
    console.log('📥 [deleteMenuItem] API Response:', {
      status: response.status,
      data: response.data
    });

    if (response.status === 200) {
      dispatch(removeMenuItem(menuItemId));
      console.log('✅ [deleteMenuItem] Successfully dispatched removeMenuItem');
      return { success: true };
    }
  } catch (error) {
    console.error('❌ [deleteMenuItem] API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    return { 
      success: false, 
      error: error.response?.data || "Unknown error" 
    };
  }
};