import { createRouter, createWebHistory } from 'vue-router'
import { isValid } from '@/services/auth/login'
import { useLayoutStore } from '@/stores/layout'

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
      meta: { layout: 'AuthLayout', requiresAuth: false },
      component: () => import('../views/auth/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { layout: 'AuthenticatedLayout', requiresAuth: true },
      component: () => import('../views/DashboardView.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  const layoutStore = useLayoutStore()

  if (to.name === 'auth.login') {
    layoutStore.change('auth')
    next()
  } else if (!isValid()) {
    next({ name: 'auth.login' })
  } else {
    layoutStore.change('authenticated')
    next()
  }
})

export default router
