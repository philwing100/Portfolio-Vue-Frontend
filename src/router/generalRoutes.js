// src/router/routes/generalRoutes.js
import AboutMe from '@/views/AboutMe.vue';
import Learn from '@/views/Learn.vue';
import Type from '@/views/Type.vue';

export default [
  {
    path: '/about-me',
    name: 'AboutMe',
    component: AboutMe
  },
  {
    path: '/learn',
    name: 'Learn',
    component: Learn
  },
  {
    path: '/type',
    name: 'Type',
    component: Type
  }
];
