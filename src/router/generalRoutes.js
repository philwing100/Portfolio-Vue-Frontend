// src/router/routes/generalRoutes.js
import Learn from '@/views/Learn.vue';
import Type from '@/views/Type.vue';
import Lists from '@/views/Lists.vue';
import Settings from '@/views/Settings.vue';
import Habits from '@/views/Habits.vue';

export default [
  /*{
    path: '/learn',
    name: 'Learn',
    component: Learn
  },*/
  {
    path: '/habits',
    name: 'HabitsPage',
    component: Habits
  },
  /*{
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
  }*/
];
