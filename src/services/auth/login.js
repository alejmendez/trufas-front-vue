import { useAuthenticateStore } from '@/stores/auth'
import { pb } from '@/utils/pocket_base'

export const Login = async ({ email, password }) => {
  const auth = useAuthenticateStore()

  const authData = await pb.collection('users').authWithPassword(email, password);
  auth.authenticate(authData)
}

export const Logout = () => {
  const auth = useAuthenticateStore()
  auth.logout()
}

export const getAuth = () => pb.authStore
export const getCurrentUser = () => pb.authStore.model
export const isValid = () => pb.authStore.isValid
export const getToken = () => pb.authStore.token
export const getAvatarUrlUser = (size) => {
  const { model } = pb.authStore
  return pb.files.getUrl(model, model.avatar, {'thumb': size})
}
