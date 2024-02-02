import { createRouter, createWebHistory } from 'vue-router'
import DashboardWorld from '../views/Dashboard.vue'
import ListsWorld from '../views/Lists.vue'
import SettingsWorld from '../views/Settings.vue'
import AboutMe from '../views/AboutMe.vue'

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardWorld
  },
  {
    path: '/Lists',
    name: 'Lists',
    component: ListsWorld
  },
  {
    path: '/Settings',
    name: 'Settings',
    component: SettingsWorld
  },
  {
    path: '/',
    name: 'About Me',
    component: AboutMe
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
