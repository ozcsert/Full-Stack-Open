import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => { 
    token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog  => {
  
 const config = {
   headers: { Authorization: token },
 }
  const response = await axios.post(baseUrl, newBlog, config)
  console.log(response);
  return  response.data
}

const update = async  blogObject => {
  const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject)
  console.log(response.data);
  return  response.data
  
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(token);
  console.log(id);
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log(response.data);
  return response.data
} 

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update, remove }