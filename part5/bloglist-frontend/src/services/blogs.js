import axios from 'axios'
const baseUrl = 'http://localhost:3004/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = () => {
  const config = {
    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
  }
  const request = axios.get(baseUrl,config)
  return request.then(response => response.data)
}

export default { getAll,setToken }