//src/API/signIn.js
import apiClient from '../frontendUtils/apiClient';

export const loginUser = async (username, password) => {
  try {
    const response = await apiClient.post('/user/login', {
      username,
      password,
    });
    console.log('Full API Response For LoginUser:', response); // Add detailed logging
    return response.data;
  } catch (error) {
    console.error(
      'Login API Error:',
      error.response ? error.response.data : error
    );
    throw error.response ? error.response.data : error;
  }
};


export const vendorLogin = async (email, password) => {
  try {
    const response = await apiClient.post('/vendor/login', {
      email,
      password,
    });
    console.log('Full API Response:', response); // Add detailed logging
    return response.data;
  } catch (error) {
    console.error('Detailed Login API Error:', {
      error,
      responseData: error.response?.data,
      responseStatus: error.response?.status
    });
    throw error;
  }
};



export const riderLogin =  async (email, password) => {
  try {
    const response = await apiClient.post('/rider/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};



