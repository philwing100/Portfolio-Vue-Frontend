// src/router/routes/accountRoutes.js
import Login from '@/views/Login.vue';
import SignUp from '@/views/SignUp.vue';

export default [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
];
