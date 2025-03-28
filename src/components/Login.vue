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

export default {
  name: 'LoginComponent',
  computed: {
    ...mapState(['isAuthenticated', 'user']), // Accessing authentication state and user data from Vuex store
  },
  methods: {
    redirectToGoogleSignIn() {
      // Redirecting to Google login
      window.location.href = `${baseURL}/auth/google`;
    },
    async logout() {
      try {
        await this.$store.dispatch('logout'); // Dispatching the logout action to Vuex
        this.$router.push('/login'); // Redirect to login page after logging out
      } catch (error) {
        console.error('Logout error:', error); // Logging any errors that occur during logout
      }
    },
  },
  mounted() {
    // Call handleGoogleLogin when the component is mounted
    this.$store.dispatch('handleGoogleLogin');
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
