// src/api.js
import { instance as axios } from './axios'; // Import your configured Axios axios
import store from './store'; // Import the Vuex store to access sessionId and other state

// API call to create a new list
export async function createList(listData) {
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
    console.error('Error creating list:', error);
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
    console.error('Error deleting list:', error);
    throw error;
  }
}
