import { get, post, patch, del } from '@/libs/axios'

const getList = async (params = {}) => {
  return await get('user', {
    params
  })
}

const getOne = async (id) => {
  const response = await get(`user/${id}`)
  return response.data
}

const create = async (data) => {
  return await post('user', data)
}

const update = async (id, data) => {
  return await patch(`user/${id}`, data)
}

const updateEmail = async (id, email) => {
  return await patch(`user/${id}`, {
    email,
  })
}

const updatePassword = async (id, password) => {
  return await patch(`user/${id}`, {
    password,
  })
}

const remove = async (id) => {
  return await del(`user/${id}`)
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
