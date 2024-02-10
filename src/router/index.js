import { createRouter, createWebHistory } from 'vue-router'
import { isValid } from '@/services/auth/login'
import { useLayoutStore } from '@/stores/layout'
import userRoute from './userRouter.js'
import fieldRoute from './fieldRouter.js'
import quarterRoute from './quarterRouter.js'
import plantRoute from './plantRouter.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        return { name: 'auth.login' }
      }
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
      component: () => import('../views/DashboardView.vue')
    },
    ...userRoute,
    ...fieldRoute,
    ...quarterRoute,
    ...plantRoute,
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
