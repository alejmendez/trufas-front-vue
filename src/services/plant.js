import { get, post, patch, del } from '@/libs/axios'

const getList = (params = {}) => {
  return get('plant', {
    params
  })
}

const getOne = async (id) => {
  const response = await get(`plant/${id}`)
  return response.data
}

const create = (data) => {
  return post('plant', data)
}

const update = (id, data) => {
  return patch(`plant/${id}`, data)
}

const remove = (id) => {
  return del(`plant/${id}`)
}

export default {
  getList,
  getOne,
  create,
  update,
  remove
}
