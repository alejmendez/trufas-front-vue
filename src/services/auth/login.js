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
    expires_in: data.expires_in,
  })

  return data
}

export const signOut = () => {
  const store = useAuthStore()
  return store.signOut()
}

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
