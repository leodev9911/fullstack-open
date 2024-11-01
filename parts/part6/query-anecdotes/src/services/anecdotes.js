import axios from 'axios'

const baseUrl = 'http://localhost:3000'

export const fetchAnecdotes = async () => {
    try {
        const response = await axios.get(`${baseUrl}/anecdotes`)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const createAnecdote = async newAnecdote => {
    try {
        const response = await axios.post(`${baseUrl}/anecdotes`, newAnecdote)
        dispatchNotification({ type: 'CREATE', payload: response.data.content })
        setTimeout(() => dispatchNotification({ type: 'CLEAR' }), 5000)

        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
} 

export const voteAnecdote = async newAnecdote => {
    try {
        const response = await axios.put(`${baseUrl}/anecdotes/${newAnecdote.id}`, newAnecdote)
        dispatchNotification({ type: 'VOTE', payload: response.data.content })
        setTimeout(() => dispatchNotification({ type: 'CLEAR' }), 5000)

        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
} 