import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-access-token': localStorage.getItem('medbox-token')
  }
})

export default api
