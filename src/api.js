// src/api.js
import { instance as axios } from './axios'; // Import your configured Axios axios
import store from './store'; // Import the Vuex store to access sessionId and other state

function verify(){
  
}

// API call to create a new list
export async function createList(listData) {
  const { sessionId } = store.state;
  console.log("sessionId: "+sessionId);
  //console.log(axios);

  if (!sessionId) {
    throw new Error('No session ID found. User may not be authenticated.');
  }



  try {
    const response = await axios.post(
      '/lists/',
      { headers: { 'Authorization': `Bearer ${sessionId}` },
      body: JSON.stringify(listData),
     },
    );
    return response.data;
  } catch (error) {
    console.warn('Error creating list:', error,...arguments);
    throw error;
  }
}

// API call to create a new list
export async function getList(listData) {
  const { sessionId } = store.state;

  console.log(axios);

  if (!sessionId) {
    throw new Error('No session ID found. User may not be authenticated.');
  }

  try {
    const response = await axios.post(
      '/lists/',
      listData,
      { headers: { 'Authorization': `Bearer ${sessionId}` } }
    );
    return response.data;
  } catch (error) {
    console.warn('Error creating list:', error,...arguments);
    throw error;
  }
}

// Example function for other list-related actions
// Add more functions as needed

export async function deleteList(listId) {
  const { sessionId } = store.state;

  if (!sessionId) {
    throw new Error('No session ID found. User may not be authenticated.');
  }

  try {
    const response = await axios.delete(`/api/lists/${listId}`, {
      headers: { 'Authorization': `Bearer ${sessionId}` },
    });
    return response.data;
  } catch (error) {
    console.warn('Error deleting list:', error,...arguments);
    throw error;
  }
}

export async function axiosGet(url, params = {}, sessionId) {
  return axios.get(url, {
    params, // Query parameters
    headers: {
      'Authorization': `Bearer ${sessionId}`
    }
  });
}

export async function axiosPost(url, data = {}, sessionId) {
  return axios.post(url, data, {
    headers: {
      'Authorization': `Bearer ${sessionId}`,
      'Content-Type': 'application/json'
    }
  });
}
