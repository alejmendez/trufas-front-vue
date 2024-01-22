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
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/users',
      name: 'user.list',
      component: () => import('../views/user/ListView.vue'),
    },
    {
      path: '/users/create',
      name: 'user.create',
      component: () => import('../views/user/CreateView.vue'),
    },
    {
      path: '/users/:id/edit',
      name: 'user.edit',
      component: () => import('../views/user/EditView.vue'),
    },
    {
      path: '/users/:id/read',
      name: 'user.view',
      component: () => import('../views/user/ReadView.vue'),
    },
    {
      path: '/fields',
      name: 'field.list',
      component: () => import('../views/field/ListView.vue'),
    },
    {
      path: '/fields/create',
      name: 'field.create',
      component: () => import('../views/field/CreateView.vue'),
    },
    {
      path: '/fields/:id/edit',
      name: 'field.edit',
      component: () => import('../views/field/EditView.vue'),
    },
    {
      path: '/fields/:id/read',
      name: 'field.view',
      component: () => import('../views/field/ReadView.vue'),
    },
    {
      path: '/quarters',
      name: 'quarter.list',
      component: () => import('../views/quarter/ListView.vue'),
    },
    {
      path: '/quarters/create',
      name: 'quarter.create',
      component: () => import('../views/quarter/CreateView.vue'),
    },
    {
      path: '/quarters/:id/edit',
      name: 'quarter.edit',
      component: () => import('../views/quarter/EditView.vue'),
    },
    {
      path: '/quarters/:id/read',
      name: 'quarter.view',
      component: () => import('../views/quarter/ReadView.vue'),
    },
    {
      path: '/plants',
      name: 'plant.list',
      component: () => import('../views/plant/ListView.vue'),
    },
    {
      path: '/plants/create',
      name: 'plant.create',
      component: () => import('../views/plant/CreateView.vue'),
    },
    {
      path: '/plants/:id/edit',
      name: 'plant.edit',
      component: () => import('../views/plant/EditView.vue'),
    },
    {
      path: '/plants/:id/read',
      name: 'plant.view',
      component: () => import('../views/plant/ReadView.vue'),
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
