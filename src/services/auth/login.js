import { post } from '@/utils/request'

const LoginRequest = (data) => {
  return post({
    path: 'auth/login',
    data,
  })
}

export const Login = async ({ email, password, remember }) => {
  const response = await LoginRequest({ email, password, remember })
  console.log(response)
}
