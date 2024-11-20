//src/API/signIn.js
import axios from 'axios';

export const signIn = async (username, password) => {
  try {
    const response = await axios.post('/api/login', {
      username,
      password,
    });
    navigate('/login/dashboard')
    return response.data;
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
