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
    jwt.value.expires_at = new Date().getTime() + jwt.value.expires_in - 60
    setLocalStorage(KEY_LOCALSTORAGE_USER, user.value)
    setLocalStorage(KEY_LOCALSTORAGE_JWT, jwt.value)

    axios.defaults.headers.common['Authorization'] = `${jwt.value.type} ${jwt.value.token}`;
  }

  function signOut() {
    delLocalStorage(KEY_LOCALSTORAGE_USER)
    delLocalStorage(KEY_LOCALSTORAGE_JWT)
    axios.defaults.headers.common['Authorization'] = '';
  }

  function refresh(token, expires_in) {
    jwt.value.token = token
    jwt.value.expires_in = expires_in

    let expires_at = new Date()
    expires_at.setMinutes(expires_at.getMinutes() + (jwt.value.expires_in / 60) - 5)

    jwt.value.expires_at = expires_at
    setLocalStorage(KEY_LOCALSTORAGE_JWT, jwt.value)
    axios.defaults.headers.common['Authorization'] = `${jwt.value.type} ${jwt.value.token}`;
  }

  function isValid() {
    return jwt.value.token !== ''
  }

  return { user, jwt, signIn, signOut, refresh, isValid }
})
