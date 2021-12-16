import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/geolocation',
    name: 'Geolocation',
    component: () => import('@/views/Geolocation.vue')
  },
  {
    path: '/streets',
    name: 'Streets',
    component: () => import('@/views/Streets.vue')
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('@/views/Map.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
