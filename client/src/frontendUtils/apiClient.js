//client/src/frontendUtils/apiClient.js
import axios from 'axios';


// Support multiple content types
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json, multipart/form-data, image/*'
  },
  timeout: 10000, // 10 second timeout
});

export default apiClient;