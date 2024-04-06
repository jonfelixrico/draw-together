import axios from 'axios'

export function createTestAxios(port = 3000) {
  return axios.create({
    baseURL: `http://localhost:${port}`,
  })
}
