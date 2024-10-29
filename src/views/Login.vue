<template>
  <div class="bruh">
    <LoginComponent />
  </div>
  <h1>Sign in</h1>
  <a class="button google" href="/login/federated/google">Sign in with Google</a>
</template>

<script>
import LoginComponent from '@/components/Login.vue';
//Needs to also display the sign up with google


export default {
  name: 'LoginWorld',
  components: {
    LoginComponent
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/signup', {
          email: this.email,
          password: this.password
        });
        this.message = 'Signup successful! Please log in.';
        // Optionally, you can redirect the user to the login page
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000); // Redirect after 2 seconds
      } catch (error) {
        console.log(error.response.data.errors);
        this.message = 'Error signing up: ' + (error.response.data.errors || error.message);
      }
    },
  }
}
</script>

<style></style>
