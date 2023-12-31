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
  //console.log(Storage.);
  
 // token === null ? setToken(): 
  
 const config = {
   headers: { Authorization: token },
 }
 console.log(config);
  const response = await axios.post(baseUrl, newBlog, config)
  return  response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken }