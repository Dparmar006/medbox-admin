import { message } from 'antd'
import axios from 'axios'
export const BASE_URL = 'http://localhost:3001'
// export const BASE_URL = 'https://medbox-backend.herokuapp.com'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-access-token': localStorage.getItem('medbox-token')
  }
})

api.interceptors.request.use(
  request => {
    request.headers = {
      ...request.headers,
      'x-access-token': localStorage.getItem('medbox-token')
    }
    return request
  },
  error => unauthorziedUserDetected(error)
)

api.interceptors.response.use(
  response => {
    return response
  },
  error => unauthorziedUserDetected(error)
)

const unauthorziedUserDetected = err => {
  if (err?.response?.status === 401) {
    if (window.location.pathname !== '/login') {
      window.location.href = '/login'
    }
    message.info('Please re-login.')
    return Promise.reject(err)
  }
  return Promise.reject(err)
}

export default api
