// src/api.js
import { instance as axios } from './axios'; // Import your configured Axios axios
import store from './store'; // Import the Vuex store to access sessionId and other state

// API call to create a new list
export async function createList(listData) {
  const { sessionId } = store.state;
  console.log("sessionId: "+sessionId);

  if (!sessionId) {
    throw new Error('No session ID found. User may not be authenticated.');
  }

  try {
    const response = await axios.post(
      '/lists/',
      { action: 'createList',
        headers: { 'Authorization': `${sessionId}` },
      data: JSON.stringify(listData),
     },
    );
    return response.data;
  } catch (error) {
    console.warn('Error creating list:', error,...arguments);
    throw error;
  }
}

export async function getList(listTitle) {
  const { sessionId } = store.state;


  if (!sessionId) {
    throw new Error('No session ID found. User may not be authenticated.');
  }

  try {
    const response = await axios.post(
      '/lists/',
      { action: 'getList',
        headers: { 'Authorization': `${sessionId}`} ,
       params: { list_title: listTitle }}
    );
    return response.data;
  } catch (error) {
    console.warn('Error creating list:', error,...arguments);
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
