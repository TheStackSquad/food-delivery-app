//src/API/signIn.js
import axios from 'axios';

export const vendorLogin = async (email, password) => {
  try {
    const response = await axios.post('/vendor/login', { email, password });
    const { data } = response;

    if (!data.success || !data.token) {
      throw new Error(data.message || 'Login failed');
    }

    return {
      success: true,
      user: data.user,
      token: data.token
    };

  } catch (error) {
    const customError = new Error(error.message || 'Login failed');
    customError.status = error.status;
    customError.data = error.data;

    throw customError;
  }
};


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
