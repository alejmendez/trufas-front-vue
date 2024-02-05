export default [
  {
    path: '/quarters',
    name: 'quarter.list',
    component: () => import('../views/quarter/ListView.vue')
  },
  {
    path: '/quarters/create',
    name: 'quarter.create',
    component: () => import('../views/quarter/CreateView.vue')
  },
  {
    path: '/quarters/:id/edit',
    name: 'quarter.edit',
    component: () => import('../views/quarter/EditView.vue')
  },
  {
    path: '/quarters/:id/read',
    name: 'quarter.view',
    component: () => import('../views/quarter/ReadView.vue')
  },
]
