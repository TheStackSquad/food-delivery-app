// src/API/signup.js
import axios from 'axios';

const signUpUser = async (formData) => {
  try {
    console.log('[signUpUser] Called with formData:', formData);
    const response = await axios.post('/api/signup', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    console.log('[signUpUser] Response received:', response);
    return response.data;
  } catch (error) {
    console.error('[signUpUser] Signup Error:', error.response || error);
    throw new Error(error.response?.data?.message || 'Sign-up failed(FrontEnd).');
  }
};

export default signUpUser;
