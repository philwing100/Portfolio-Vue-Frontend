// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store'; // Vuex store for authentication state

// Import route groups
import dashboardRoutes from './dashboardRoutes';
import accountRoutes from './accountRoutes';
//import generalRoutes from './generalRoutes';

// Import the NotFound component
import NotFound from '@/views/NotFound.vue';

// Combine routes
const routes = [
  ...dashboardRoutes,
  ...accountRoutes,
  //...generalRoutes,
  // Catch-all route for 404 page
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuthenticated; // Get auth status from Vuex

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Route requires auth and user is not authenticated
    if (!isAuthenticated) {
      next({ name: 'Login' }); // Redirect to login page
    } else {
      next(); // Proceed to route
    }
  } else {
    next(); // Proceed to route
  }
});

export default router;
