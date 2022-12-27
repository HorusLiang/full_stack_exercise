import axios from 'axios'
const baseUrl = 'http://localhost:3002/persons'


const getAll=()=>{
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}



const deleteById=(id)=>{
    console.log(id)
    return axios.delete(`${baseUrl}/${id}`).then(res=>res.status)
}


const updatePerson = (id, data) => {
    return axios.put(`${baseUrl}/${id}`, data).then(res => res.data)
}
    




export default { create,getAll,deleteById,updatePerson }