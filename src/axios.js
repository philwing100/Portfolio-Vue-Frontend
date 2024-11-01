// axios.js
import axios from 'axios';

const baseURL = 'http://localhost:3000/api'; // Define the base URL here

const instance = axios.create({
  baseURL, // Use the base URL here
  withCredentials: true, // Include credentials with requests
});

export { instance, baseURL }; // Export both the instance and base URL
