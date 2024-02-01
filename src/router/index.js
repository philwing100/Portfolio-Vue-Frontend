import { createRouter, createWebHistory } from 'vue-router'
import DashboardWorld from '../views/Dashboard.vue'
import ListsWorld from '../views/Lists.vue'
import SettingsWorld from '../views/Settings.vue'

const routes = [
  {
    path: '/',
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
