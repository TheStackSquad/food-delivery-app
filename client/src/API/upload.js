// client/src/API/upload.js
//import apiClient from "../frontendUtils/apiClient";
//import { getAccessToken } from '../frontendUtils/tokenUtils';

import axios from 'axios';
// Create an Axios instance with the hardcoded baseURL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const dashboardApiUri = '/user/login/dashboard';

export const uploadImage = async (imageFile, token) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    console.log('[upload.js] Uploading image...');

    const response = await axiosInstance.post(dashboardApiUri, formData, {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('[upload.js] Upload successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('[upload.js] Error uploading image:', error.message);
    throw error;
  }
};



// upoad vendor Image
export const uploadVendorImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

