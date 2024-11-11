import axios from 'axios'

let token

const baseUrl = 'http://localhost:8080/api/blogs'

const getAll = async () => {
    try {
        const response = await axios.get(baseUrl)
        return response.data
    } catch (error) {
        throw new error
    }
}

const setToken = (t) => {
    token = t
}

const create = async (newBlog) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const addLike = async (editBlog) => {
    const response = await axios.put(`${baseUrl}/${editBlog.id}`, editBlog)
    return response.data
}

const commentBlog = async (editBlog) => {
    const response = await axios.put(`${baseUrl}/${editBlog.id}/comments`, editBlog)
    return response.data
}

const deleteBlog = async (id) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    await axios.delete(`${baseUrl}/${id}`, config)
}

export default { 
    getAll, 
    setToken, 
    create, 
    addLike, 
    deleteBlog,
    commentBlog
}