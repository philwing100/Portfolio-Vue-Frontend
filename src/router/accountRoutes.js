// src/router/routes/accountRoutes.js
import Login from '@/views/Login.vue';
import SignUp from '@/views/SignUp.vue';
import Settings from '@/views/Settings.vue';

export default [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
];
