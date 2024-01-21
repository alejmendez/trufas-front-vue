<script setup>
import { shallowRef, provide } from 'vue'
import { RouterView } from 'vue-router'

import router from '@/router'
import layouts from '@/layouts'

const layout = shallowRef('div')

router.afterEach((to) => {
  layout.value = layouts[to.meta.layout] || 'div'
})

provide('app:layout', layout)
</script>

<template>
  <component :is="layout || 'div'">
    <RouterView />
  </component>
</template>
