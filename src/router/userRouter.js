export default [
  {
    path: '/users',
    name: 'user.list',
    component: () => import('../views/user/ListView.vue')
  },
  {
    path: '/users/create',
    name: 'user.create',
    component: () => import('../views/user/CreateView.vue')
  },
  {
    path: '/users/:id/edit',
    name: 'user.edit',
    component: () => import('../views/user/EditView.vue')
  },
  {
    path: '/users/:id/read',
    name: 'user.view',
    component: () => import('../views/user/ReadView.vue')
  },
]
