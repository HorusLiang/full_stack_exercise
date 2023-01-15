import axios from 'axios'
const baseUrl = 'http://localhost:3004/api/blogs'

let token = null
let userId=null
const setToken = newToken => {
  token = `bearer ${newToken}`
}
const setUserId = currentUserId => {
  userId=currentUserId
}


const getAll = () => {
  const config = {
    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
  }
  const request = axios.get(baseUrl,config)
  return request.then(response => response.data)
}
const createNew=(blog)=>{
  const config = {
    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
  }
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}
const update = (id, newObject) => {
  const config = {
    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
  }
  newObject.user=userId
  const request = axios.put(`${ baseUrl }/${id}`, newObject,config)
  return request.then(response => response.data)
}


export default { getAll,setToken,createNew,update,setUserId }