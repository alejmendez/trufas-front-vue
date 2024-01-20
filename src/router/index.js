import { createRouter, createWebHistory } from 'vue-router'
import { isValid } from '@/services/auth/login'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        return { name: 'auth.login' }
      },
    },
    {
      path: '/login',
      name: 'auth.login',
      component: () => import('../views/auth/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    },
  ]
})

router.beforeEach((to) => {
  if (!isValid() && to.name !== 'auth.login') {
    return { name: 'auth.login' }
  }
})


export default router
