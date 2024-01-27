import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { isValid } from '@/services/auth/login'

export const useLayoutStore = defineStore('layout', () => {
  const name = ref(localStorage.getItem('layoutName') || (isValid() ? 'authenticated' : 'auth'))
  const layoutName = computed(() => name.value)

  function change(n) {
    name.value = n
  }

  return { name, layoutName, change }
})
