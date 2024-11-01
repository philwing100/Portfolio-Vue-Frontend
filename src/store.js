import { createStore } from 'vuex';
import { instance as axios } from './axios'; // Import the axios instance

const store = createStore({
  state: {
    user: null,
    isAuthenticated: false,
  },
  mutations: {
    SET_USER(state, user) {
      console.log('User authenticated:', user);
      state.user = user;
      state.isAuthenticated = !!user;
    },
    LOGOUT(state) {
      console.log('User logged out');
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  actions: {
    async checkAuth({ commit }) {
      try {
        console.log('Checking authentication with axios instance:', axios);
        const response = await axios.get('/auth/check-auth'); // Axios will use the baseURL from axios.js
        commit('SET_USER', response.data.user);
      } catch (error) {
        console.error('Not authenticated:', error);
        commit('LOGOUT');
      }
    },
    async logout({ commit }) {
      try {
        await axios.post('/auth/logout');
        commit('LOGOUT');
      } catch (error) {
        console.error('Logout error:', error);
      }
    },
  },
});

export default store;
