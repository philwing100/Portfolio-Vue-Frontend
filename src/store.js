import { createStore } from 'vuex';
import axios from './axios'; // Make sure to import your axios instance

const store = createStore({
  state: {
    user: null, // Store user data
    isAuthenticated: false, // Authentication status
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
    LOGOUT(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  actions: {
    async checkAuth({ commit }) {
      console.log("checking auth");
      try {
        const response = await axios.get('/check-auth', { withCredentials: true });
        commit('SET_USER', response.data.user); // Set user data from response
      } catch (error) {
        commit('LOGOUT'); // If error occurs, user is not authenticated
      }
    },
    async login({ commit }, credentials) {
      try {
        await axios.post('/login', credentials, { withCredentials: true });
        await this.dispatch('checkAuth'); // Re-check auth status after login
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    async logout({ commit }) {
      try {
        await axios.post('/logout', {}, { withCredentials: true });
        commit('LOGOUT'); // Commit mutation to log the user out
      } catch (error) {
        console.error('Logout error:', error);
      }
    },
  },
});

export default store;
