import axios from 'axios'

const baseUrl = 'http://localhost:3001'

const getAll = async () => {
    const response = await axios.get(`${baseUrl}/anecdotes`)
    return response.data
}

const newAnecdote = async (content) => {
    const anecdote = { content, votes: 0 }

    const response = await axios.post(`${baseUrl}/anecdotes`, anecdote)

    return response.data
}

const voteAnecdote = async (newAnecdote) => {
    const response = await axios.put(`${baseUrl}/anecdotes/${newAnecdote.id}`, newAnecdote)
    return response.data
}

export default { getAll, newAnecdote, voteAnecdote } 