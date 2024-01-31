import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (401 === error.response.status) {
      localStorage.clear();
      window.location.href = "/login";
    } else {
      return Promise.reject(error)
    }
  }
)

export const get = async (url, params = {}) => {
  const response = await axios.get(url, {
    params
  })
  return response.data
}

export const post = async (url, data = {}) => {
  const headers = {}
  if (data instanceof FormData) {
    headers['Content-Type'] = 'multipart/form-data'
  }

  return await axios.post(url, data, {
    headers,
  })
}

export const patch = async (url, data = {}) => {
  const headers = {}

  if (data instanceof FormData) {
    data.append('_method', 'PATCH')
    headers['Content-Type'] = 'multipart/form-data'
  }

  return await axios.post(url, data, {
    headers,
  })
}

export const del = async (url) => {
  return await axios.delete(url)
}

export default instance
