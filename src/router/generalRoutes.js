// src/router/routes/generalRoutes.js
import AboutMe from '@/views/AboutMe.vue';
import Learn from '@/views/Learn.vue';
import Type from '@/views/Type.vue';
import Lists from '@/views/Lists.vue';
import Settings from '@/views/Settings.vue';

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
  },
  {
    path: '/Lists',
    name: 'Lists',
    component: Lists
  },
  {
    path: '/Settings',
    name: 'Settings',
    component: Settings
  }
];
