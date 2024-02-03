import { get, post, patch, del } from '@/libs/axios'

const getList = (params = {}) => {
  return get('user', {
    params
  })
}

const getOne = async (id) => {
  const response = await get(`user/${id}`)
  return response.data
}

const create = (data) => {
  return post('user', data)
}

const update = (id, data) => {
  return patch(`user/${id}`, data)
}

const updateEmail = (id, email) => {
  return patch(`user/${id}`, {
    email,
  })
}

const updatePassword = (id, password) => {
  return patch(`user/${id}`, {
    password,
  })
}

const remove = (id) => {
  return del(`user/${id}`)
}

export default {
  getList,
  getOne,
  create,
  update,
  updateEmail,
  updatePassword,
  remove
}
