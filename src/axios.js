// axios.js
import axios from 'axios';
const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://portfolio-backend-pi-liart.vercel.app";

const baseURL = API_URL + '/api'; // Define the base URL here
  
const instance = axios.create({
  baseURL, // Use the base URL here
  withCredentials: true, // Include credentials with requests
});

export { instance, baseURL }; // Export both the instance and base URL
