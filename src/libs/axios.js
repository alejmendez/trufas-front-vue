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

export default instance
