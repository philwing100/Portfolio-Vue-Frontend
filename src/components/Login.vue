<template>
  <div>
    <div v-if="!isAuthenticated" class="bruh">
      <h1>Login</h1>
      <div>
        <form @submit.prevent="login">
          <label for="username">Email</label>
          <input v-model="username" name="username" placeholder="username" type="text" />
          <label for="password">Password</label>
          <input v-model="password" name="password" type="password" />
          <button>Login</button>
        </form>
      
        <button @click="redirectToSignUp()">Sign up</button>
      </div>
    </div>

    <div v-if="isAuthenticated">
      <h1>You are currently logged in</h1>
      <button @click="logout()">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'LoginComponent',
  computed: {
    ...mapState(['isAuthenticated', 'user']),
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', { username: this.username, password: this.password });
        this.$router.push('/');
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    redirectToSignUp() {
      this.$router.push('/signup');
    },
    async logout() {
      try {
        await this.$store.dispatch('logout');
      } catch (error) {
        console.error('Logout error:', error);
      }
    },
    async testAPI() {
      try {
        const response = await axios.get('http://localhost:3000/api/test');
        console.log(response.data);
      } catch (error) {
        console.error('Error calling test API:', error);
      }
    },
  },
  created() {
    this.$store.dispatch('checkAuth');
    this.testAPI();
  },
};
</script>

<style>
</style>
