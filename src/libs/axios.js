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
  const response = await instance.get(url, params)
  return response.data
}

const objectHasFileInput = (data) => {
  console.log(data)
  return Object.entries(data).filter(value => value[1]?.files?.length > 0).length > 0
}

const objectToFormData = (data = {}) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value.files?.length > 0 ? value.files[0] : value)
  })
  return formData
}

export const _post = async (url, data) => {
  const headers = {}

  if (objectHasFileInput(data)) {
    data = objectToFormData(data)
    headers['Content-Type'] = 'multipart/form-data'
  }

  return await instance.post(url, data, {
    headers,
  })
}

export const post = (url, data) => _post(url, data)

export const patch = (url, data) => {
  data['_method'] = 'PATCH'
  return _post(url, data)
}

export const del = async (url) => {
  return await instance.delete(url)
}

export default instance
