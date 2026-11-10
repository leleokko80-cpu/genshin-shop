import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

// Automatically attach the JWT Bearer token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// If the backend returns 401, clear the token (expired/invalid)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('userId')
      localStorage.removeItem('nom')
      localStorage.removeItem('ville')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
