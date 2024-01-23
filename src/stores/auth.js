import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/libs/axios'

const KEY_LOCALSTORAGE_USER = 'user'
const KEY_LOCALSTORAGE_JWT = 'jwt'

const getLocalStorage = (key, def) => {
  const content = localStorage.getItem(key)

  if (content === undefined || content === null) {
    return def
  }

  return JSON.parse(content)
}

const setLocalStorage = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val))
}

const delLocalStorage = (key) => {
  localStorage.removeItem(key)
}

const initRefUser = () => (
  ref(getLocalStorage(KEY_LOCALSTORAGE_USER, {
    name: '',
    email: '',
    avatar: '',
  }))
)

const initRefJwt = () => (
  ref(getLocalStorage(KEY_LOCALSTORAGE_JWT, {
    token: '',
    token_type: '',
    expires_in: '',
  }))
)

export const useAuthStore = defineStore('auth', () => {
  const user = initRefUser()
  const jwt = initRefJwt()

  if (jwt.value.token) {
    axios.defaults.headers.common['Authorization'] = `${jwt.value.type} ${jwt.value.token}`;
  }

  function signIn(dataUser, dataJwt) {
    user.value = dataUser
    jwt.value = dataJwt
    setLocalStorage(KEY_LOCALSTORAGE_USER, dataUser)
    setLocalStorage(KEY_LOCALSTORAGE_JWT, dataJwt)

    axios.defaults.headers.common['Authorization'] = `${dataJwt.type} ${dataJwt.token}`;
  }

  function signOut() {
    delLocalStorage(KEY_LOCALSTORAGE_USER)
    delLocalStorage(KEY_LOCALSTORAGE_JWT)
    axios.defaults.headers.common['Authorization'] = '';
  }

  function isValid() {
    return jwt.value.token !== ''
  }

  return { user, jwt, signIn, signOut, isValid }
})
