import { message } from 'antd'
import axios from 'axios'
// const BASE_URL = 'http://localhost:3001'
const BASE_URL = 'https://medbox-backend.herokuapp.com'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-access-token': localStorage.getItem('medbox-token')
  }
})

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
    return err
  }
  return err
}

export default api
