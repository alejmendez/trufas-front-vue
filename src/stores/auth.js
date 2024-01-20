import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { pb } from '@/utils/pocket_base'

const STORE_NAME = 'auth'

export const useAuthenticateStore = defineStore(STORE_NAME, () => {
  const authStorage = JSON.parse(localStorage.getItem(STORE_NAME))

  console.log(authStorage)

  const data = reactive({
    authenticated: false,
    token: '',
    user: {},
  })

  const user = computed(() => data.user)
  const isAuthenticated = computed(() => data.authenticated)


  function authenticate(d) {
    data.authenticated = true
    data.token = d.token
    data.user = d.record
  }

  function logout() {
    data.authenticated = false
    data.token = ''
    data.user = {}
    pb.authStore.clear()
  }

  return {
    data,
    user,
    isAuthenticated,
    authenticate,
    logout
  }
})
