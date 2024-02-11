import axios from '@/libs/axios'
import { useAuthStore } from '@/stores/auth'

export const signIn = async ({ email, password }) => {
  const response = await axios.post('auth/login', {
    email,
    password
  })
  const { data } = response
  const store = useAuthStore()
  store.signIn(data.user, {
    token: data.access_token,
    type: data.token_type,
    expires_in: data.expires_in
  })

  return data
}

export const signOut = () => {
  clearInterval(refreshInterval)
  const store = useAuthStore()
  return store.signOut()
}

export const statusToken = () => {
  const store = useAuthStore()

  if (!store.isValid()) {
    return
  }

  axios.get('auth/me')
}

export const getRefreshToken = async () => {
  const store = useAuthStore()

  if (!store.isValid()) {
    return
  }

  const response = await axios.post('auth/refresh')
  const { data } = response

  store.refresh(data.access_token, data.expires_in)

  return data
}

let refreshTime = 1000 * 60 * 5
let refreshInterval = setInterval(getRefreshToken, refreshTime)
setTimeout(statusToken, 5000)

export const getCurrentUser = () => {
  const store = useAuthStore()
  return store.user
}
export const isValid = () => {
  const store = useAuthStore()
  return store.isValid()
}
export const getAvatarUrlUser = () => {
  const store = useAuthStore()
  return store.user.avatar
}
