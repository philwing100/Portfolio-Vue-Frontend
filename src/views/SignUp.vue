<template>
    <div class="signup-container">
        <h2>Sign Up</h2>
        <form @submit.prevent="signup">
            <input type="email" placeholder="Email" v-model="email" required>
            <input type="password" placeholder="Password" v-model="password" required>
            Retype password
            <input type="password" placeholder="Password" v-model="password1" required>
            <button type="submit">Sign Up</button>
        </form>
        <button @click="redirectToLogin">Login</button>
        <div v-if="message" class="message">{{ message }}</div>
    </div>
</template>

<script>
import axios from 'axios';

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://portfolio-backend-pi-liart.vercel.app";

export default {
    data() {
        return {
            email: '',
            password: '',
            password1: '',
            message: ''
        };
    },
    methods: {
        async signup() {
            if(this.password === this.password1){
                //console.log(this.password === this.password1);
                try {
                    const response = await axios.post(API_URL + '/api/signup', {
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
        } else {
            this.message = 'Passwords must match';
        }
        },
        redirectToLogin() {
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>
.signup-container {
  background-color: var(--primary);
  color: var(--accentColor);
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 25rem;
  margin: 2rem auto;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
}

.signup-container h2 {
  color: var(--accentColor);
  text-align: center;
  margin-bottom: 1.5rem;
}

.signup-container form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.signup-container input {
  padding: 0.75rem;
  border: 0.0625rem solid var(--secondaryColor);
  border-radius: 0.25rem;
  background-color: var(--secondaryColor);
  color: var(--accentColor);
  font-size: 1rem;
}

.signup-container input:focus {
  outline: none;
  border-color: var(--accentColor);
  box-shadow: 0 0 0 0.125rem rgba(255, 255, 255, 0.2);
}

button {
  background-color: var(--accentColor);
  color: var(--primary);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: opacity 0.3s ease;
  margin: 0.5rem 0;
}

button:hover {
  opacity: 0.8;
}

.message {
  margin-top: 0.625rem;
  color: var(--accentColor);
  text-align: center;
  font-size: 0.875rem;
}
</style>