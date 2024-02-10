import { get, post, patch, del } from '@/libs/axios'

const getList = (params = {}) => {
  return get('field', {
    params
  })
}

const getListSelect = (params = {}) => {
  return getList({
    ...params,
    type_result: 'select'
  })
}

const getOne = async (id) => {
  const response = await get(`field/${id}`)
  return response.data
}

const create = (data) => {
  return post('field', data)
}

const update = (id, data) => {
  return patch(`field/${id}`, data)
}

const remove = (id) => {
  return del(`field/${id}`)
}

export default {
  getList,
  getListSelect,
  getOne,
  create,
  update,
  remove
}
