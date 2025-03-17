import axios from 'axios';
// import { API_BASE_URL } from '@env';
// console.log(API_BASE_URL); // Test if it's resolved

// Create an Axios instance with base configuration
const apiClient = axios.create({
  // baseURL: API_BASE_URL, // e.g., http://192.168.1.100:3000/api
  timeout: 10000,        // Request timeout in milliseconds (10 seconds)
  headers: {
    'Content-Type': 'application/json', // Default content type for requests
  },
});

export default apiClient;