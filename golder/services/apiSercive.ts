import axios from "axios";
import Constants from "expo-constants";
// import { API_BASE_URL } from '@env';
// console.log(API_BASE_URL); // Test if it's resolved
const API_BASE_URL = Constants.expoConfig?.extra;

// Create an Axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL?.URI, // e.g., http://192.168.1.100:3000/api
  timeout: 10000, // Request timeout in milliseconds (10 seconds)
  headers: {
    "Content-Type": "application/json", // Default content type for requests
  },
});

export default apiClient;
