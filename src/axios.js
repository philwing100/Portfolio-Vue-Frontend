// axios.js
import axios from 'axios';
import store from './store.js';
const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://portfolio-backend-pi-liart.vercel.app";

const baseURL = API_URL + '/api'; // Define the base URL here
  
let instance = axios.create({
  baseURL, // Use the base URL here
  withCredentials: true, // Include credentials with requests
  credentials: 'include',
});

export { instance, baseURL }; // Export both the instance and base URL
