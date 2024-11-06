//src/API/signIn.js
import axios from 'axios';

const signIn = async (username, password) => {
  try {
    const response = await axios.post('/api/login', {
      username,
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

export default signIn;