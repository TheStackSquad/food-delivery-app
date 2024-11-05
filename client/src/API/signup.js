// src/API/signup.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Add explicit base URL

const signUpUser = async (formData) => {
  try {
    console.log('Submitting form data:', formData);
    const response = await axios.post(`${API_BASE_URL}/api/signup`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    console.log('Sign Up Data', response);
    return response.data;
  } catch (error) {
    console.error('Signup Error:', error.response || error);
    throw new Error(error.response?.data?.message || 'Sign-up failed(FrontEnd).');
  }
};

export default signUpUser;