//src/API/signIn.js
import axios from 'axios';

export const loginUser = async (username, password) => {
  console.log('loginUser Api Hit');
  try {
    const response = await axios.post('/api/login', {
      username,
      password,
    });
    console.log('loginUser Recieved Data: ', response.data.user);
    return response.data; // Return response to the calling function
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const riderLogin =  async (email, password) => {
  try {
    const response = await axios.post('/api/rider/login', {
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

export const vendorLogin = async (email, password) => {
  console.log('vendorLogin Hit');
  try {
    const response = await axios.post('/api/vendor/login', {
      email,
      password,
    });

    // Return the entire response
    return response;

  } catch (error) {
    // Throw the error with more detailed information
    if (error.response?.data) {
      // eslint-disable-next-line
      throw {
        message: error.response.data.message || 'Login failed',
        status: error.response.status,
        data: error.response.data
      };
    }
    throw error;
  }
};



