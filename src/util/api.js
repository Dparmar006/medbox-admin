import { message } from 'antd'
import axios from 'axios'
import { BACKEND_BASE_URL } from './constants'
const api = axios.create({
  baseURL: BACKEND_BASE_URL,
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
