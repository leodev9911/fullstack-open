/* eslint-disable no-case-declarations */
import { createSlice } from '@reduxjs/toolkit'
import anecdotesServices from '../../services/anecdotes'

const anecdotesSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        vote(state, action) {
            const id = action.payload
            const anecdoteIndex = state.findIndex(e => e.id === id)

            if (anecdoteIndex !== -1) state[anecdoteIndex].votes += 1
        },
        addAnecdote(state, action) {
            const content = action.payload

            state.push({
                content,
                votes: 0
            })
        },
        setAnecdotes(state, action) {
            return action.payload
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
    }
})

export const { vote, addAnecdote, setAnecdotes, appendAnecdote } = anecdotesSlice.actions
export default anecdotesSlice.reducer

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdotesServices.newAnecdote(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const voteAnecdote = (newAnecdote) => {
    return async dispatch => {
        const response = await anecdotesServices.voteAnecdote(newAnecdote)
        dispatch(vote(response.id))
    }
}

export const initializeAnecdote = () => {
    return async dispatch => {
        const anecdotes = await anecdotesServices.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

