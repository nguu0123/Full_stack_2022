import axios from "axios"
const baseUrl = "/api/users"
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => {
    return response.data
  })
}
const createUser = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}
export default { getAll, createUser }
