import axios from '@/libs/axios'

const getList = async (params = {}) => {
  const response = await axios.get('user', {
    params
  })
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`user/${id}`)
  return response.data.data
}

const create = async (data) => {
  return await axios.post('user', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const update = async (id, data) => {
  return await axios.patch(`user/${id}`,
    {
      "_method": "PATCH",
      ...data
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}

const updateEmail = async (id, email) => {
  return await axios.patch(`user/${id}`, {
    "_method": "PATCH",
    email,
  })
}

const updatePassword = async (id, password) => {
  return await axios.patch(`user/${id}`, {
    "_method": "PATCH",
    password,
  })
}

const remove = async (id) => {
  return await axios.delete(`user/${id}`)
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
