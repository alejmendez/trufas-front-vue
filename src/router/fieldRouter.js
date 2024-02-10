export default [
  {
    path: '/fields',
    name: 'field.list',
    component: () => import('../views/field/ListView.vue')
  },
  {
    path: '/fields/create',
    name: 'field.create',
    component: () => import('../views/field/CreateView.vue')
  },
  {
    path: '/fields/:id/edit',
    name: 'field.edit',
    component: () => import('../views/field/EditView.vue')
  },
  {
    path: '/fields/:id/read',
    name: 'field.view',
    component: () => import('../views/field/ReadView.vue')
  },
]
