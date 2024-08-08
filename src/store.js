import { createStore } from 'vuex';
import axios from 'axios';

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
      try {
        const response = await axios.get('http://localhost:3000/api/check-auth');
        commit('SET_USER', response.data.user);
      } catch (error) {
        commit('LOGOUT');
      }
    },
    async login({ commit }, credentials) {//!1Abcdefgh
      try {
        await axios.post('http://localhost:3000/api/login', credentials);
        await this.dispatch('checkAuth'); // Re-check auth status after login
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    async logout({ commit }) {
      try {
        await axios.post('http://localhost:3000/api/logout');
        commit('LOGOUT');
      } catch (error) {
        console.error('Logout error:', error);
      }
    },
  },
});

export default store;
