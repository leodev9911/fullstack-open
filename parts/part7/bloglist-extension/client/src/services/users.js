import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/users'

export const fetchAllUsers = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export default { fetchAllUsers }