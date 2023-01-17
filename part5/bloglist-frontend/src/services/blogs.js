import axios from 'axios'
const baseUrl = 'http://localhost:3004/api/blogs'

let token = null
let userId=null
let name=null
const setToken = newToken => {
  token = `bearer ${newToken}`
}
const setUserId = currentUserId => {
  userId=currentUserId
}
const setName = currentName => {
  name=currentName
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
  blog.user=userId
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}
const update = (id, blog) => {
  const config = {
    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
  }
  // blog.user=userId
  console.log("---",blog)
  const request = axios.put(`${ baseUrl }/${id}`, blog,config)
  return request.then(response => response.data)
}
const deleteBlog=(id)=>{
  const config = {
    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
  }
  const request = axios.delete(`${ baseUrl }/${id}`,config)
  return request.then(response => response.data)
}


export default { getAll,setToken,createNew,update,setUserId,setName,deleteBlog }