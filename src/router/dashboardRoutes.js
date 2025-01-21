import DashboardWorld from '../views/Dashboard.vue';
import AboutMe from '@/views/AboutMe.vue';

export default [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardWorld,
  },
    {
      path: '/about-me',
      name: 'AboutMe',
      component: AboutMe
    },
];
