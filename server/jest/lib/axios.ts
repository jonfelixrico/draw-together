import axios from 'axios'

export const testAxios = axios.create({
  baseURL: 'http://localhost:3000',
})
