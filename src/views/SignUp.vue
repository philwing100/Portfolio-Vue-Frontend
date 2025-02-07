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
}

button {
}

.message {
    margin-top: 10px;
    color: green;
}
</style>