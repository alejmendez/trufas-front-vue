import { pb } from '@/utils/pocket_base'

export const Login = async ({ email, password }) => {
  await pb.collection('users').authWithPassword(email, password, {
    expand: 'role'
  });
}

export const Logout = () => {
  pb.authStore.clear()
}

export const getAuth = () => pb.authStore
export const getCurrentUser = () => pb.authStore.model
export const isValid = () => pb.authStore.isValid
export const getToken = () => pb.authStore.token
export const getAvatarUrlUser = (size) => {
  const { model } = pb.authStore
  if (model === null) {
    return ''
  }
  return pb.files.getUrl(model, model.avatar, {'thumb': size})
}
