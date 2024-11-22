// client/src/API/upload.js

import axios from 'axios';

// Upload image to the server
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch profile image from the server
export const fetchProfileImage = async () => {
  try {
    const response = await axios.get('/api/profile');
    return response.data.user.profilePicture;
  } catch (error) {
    throw error;
  }
};
