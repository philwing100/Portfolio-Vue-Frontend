<template>
  <div>
    <div v-if="!isAuthenticated" class="login-container">
      <h1>Login</h1>
      <div class="add-button login-container" :style="{ 
          maxWidth: '300px',           
          margin: '0 auto',
           }" @click="redirectToGoogleSignIn">Sign in with Google</div>
    </div>

    <div v-if="isAuthenticated" class="logged-in-container">
      <h1>Welcome, {{ user.email }}</h1>
      <div class="add-button" :style="{ 
        maxWidth: '300px',
        margin: '0 auto' }" @click="logout">Logout</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'; // Importing Vuex to access state
import { baseURL } from '../axios'; // Importing the base URL from axios
import './ListItems/ListElement.css';

export default {
  name: 'LoginComponent',
  computed: {
    ...mapState(['isAuthenticated', 'user']), // Accessing authentication state and user data from Vuex store
  },
  methods: {
    redirectToGoogleSignIn() {
      // Redirecting to the Google login URL using the imported base URL
      window.location.href = `${baseURL}/auth/google`; 
    },
    async logout() {
      try {
        await this.$store.dispatch('logout'); // Dispatching the logout action to Vuex
        // Optionally, redirect to login page after logging out
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout error:', error); // Logging any errors that occur during logout
      }
    },
  },
  mounted() {
    // Check if the user is authenticated when the component is mounted
    this.$store.dispatch('checkAuth');
  },
};
</script>

<style scoped>
.login-container, .logged-in-container {
  text-align: center; 
  margin-top: 20px;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
</style>
