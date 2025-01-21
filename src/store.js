import { createStore } from 'vuex';
import { instance as axios } from './axios';
import Cookies from 'js-cookie'; // Import js-cookie for cookie management

const store = createStore({
  state: {
    user: null,
    isAuthenticated: false,
    sessionId: null, // Store the session ID here
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
    LOGOUT(state) {
      //console.log('User logged out');
      state.user = null;
      state.isAuthenticated = false;
      state.sessionId = null;
    },
    SET_SESSION_ID(state, sessionId) {
      state.sessionId = sessionId;
    },
  },
  actions: {
    async checkAuth({ commit }) {
      try {
        const response = await axios.get('/auth/check-auth');
        commit('SET_USER', response.data.user);
        // Retrieve and commit the session ID from the cookie if available
        const sessionId = Cookies.get('sessionId');
        console.log(sessionId);
        if (sessionId) {
          commit('SET_SESSION_ID', sessionId);
        }
      } catch (error) {
        console.warn('Not authenticated:', error,...arguments);
        commit('LOGOUT');
      }
    },
    async logout({ commit }) {
      try {
        await axios.post('/auth/logout');
        commit('LOGOUT');
      } catch (error) {
        console.warn('Logout error:', error,...arguments);
      }
    },
  },
});

export default store;
