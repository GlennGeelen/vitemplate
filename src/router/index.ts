import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuth } from '@/stores/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuth()
  if (!authStore.isAuthenticated && to.meta.requiresAuth) {
    next({ name: 'Login' })
  }
  next()
})

export default router