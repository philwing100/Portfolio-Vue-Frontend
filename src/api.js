import { instance as axios } from './axios'; // Import your configured Axios instance
import store from './store'; // Import the Vuex store to access sessionId and other state


// Validate token function (defined once and reused)
function validateToken() {
  const { token } = store.state;
  if (!token) {
    console.log(token);
    throw new Error('No token ID found. User may not be authenticated.');
  }else{
    axios.defaults.headers.common['authorization'] = `${token}`;
  }
}

// Set the default Authorization header for all requests

// API call to create a new list
export async function createList(listData) {
  validateToken();

  try {
    const response = await axios.post(
      '/lists/',
      {
        action: 'createList',
        data: JSON.stringify(listData),
      }
    );
    return response.data;
  } catch (error) {
    console.warn('Error creating list:', error, ...arguments);
    throw error;
  }
}

// API call to get a list by its title
export async function getList(listTitle) {
  // Validate token before making the API call
  validateToken();

  try {
    const response = await axios.post(
      '/lists/',
      {
        action: 'getList',
        params: { list_title: listTitle },
      }
    );
    return response.data;
  } catch (error) {
    console.warn('Error fetching list:', error, ...arguments);
    throw error;
  }
}

// Generic GET request with token validation
export async function axiosGet(url, params = {}) {
  // Validate token before making the API call
  validateToken();

  try {
    const response = await axios.get(url, {
      params, // Query parameters
    });
    return response.data;
  } catch (error) {
    console.warn('Error with GET request:', error, ...arguments);
    throw error;
  }
}

// Generic POST request with token validation
export async function axiosPost(url, data = {}) {
  // Validate token before making the API call
  validateToken();

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.warn('Error with POST request:', error, ...arguments);
    throw error;
  }
}
