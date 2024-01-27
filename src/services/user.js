import axios from '@/libs/axios'

const getList = async (params = {}) => {
  const response = await axios.get('user', {
    params
  })
  return response.data
}

const getOne = async (id) => {
  return await axios.get(`user/${id}`)
}

const create = async (data) => {
  return await axios.post('user', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const update = async (id, data) => {
  return await axios.post(`user/${id}`, data)
}

const remove = async (id) => {
  return await axios.delete(`user/${id}`)
}

export default {
  getList,
  getOne,
  create,
  update,
  remove
}
