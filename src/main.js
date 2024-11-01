import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Ensure the correct path
import router from './router'; // Assuming you have a router
import axios from 'axios';

axios.defaults.withCredentials = true;

const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app');
