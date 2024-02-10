export default [
  {
    path: '/plants',
    name: 'plant.list',
    component: () => import('../views/plant/ListView.vue')
  },
  {
    path: '/plants/create',
    name: 'plant.create',
    component: () => import('../views/plant/CreateView.vue')
  },
  {
    path: '/plants/:id/edit',
    name: 'plant.edit',
    component: () => import('../views/plant/EditView.vue')
  },
  {
    path: '/plants/:id/read',
    name: 'plant.view',
    component: () => import('../views/plant/ReadView.vue')
  }
]
