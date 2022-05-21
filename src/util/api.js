import { message } from 'antd'
import axios from 'axios'
import { store } from '../redux/store'
export const BASE_URL = 'http://localhost:3001'
// export const BASE_URL = 'https://medbox-backend.herokuapp.com'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-access-token': store.getState().auth.token
  }
})

api.interceptors.request.use(
  request => {
    if (request.headers['x-access-token']) {
      return request
    }
    return message.info('Please re-login.')
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
    return err
  }
  return err
}

export default api
