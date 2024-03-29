import { get, post, patch, del } from '@/libs/axios'

const getList = (params = {}) => {
  return get('quarter', {
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
  const response = await get(`quarter/${id}`)
  return response.data
}

const create = (data) => {
  return post('quarter', data)
}

const update = (id, data) => {
  return patch(`quarter/${id}`, data)
}

const remove = (id) => {
  return del(`quarter/${id}`)
}

export default {
  getList,
  getListSelect,
  getOne,
  create,
  update,
  remove
}
