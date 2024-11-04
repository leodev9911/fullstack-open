import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    success: '',
    error: ''
}

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        createNotification: (state, action) => {
            const { type, message } = action.payload

            return state = {
                ...state,
                [type]: message
            }
        },
        clearNotification: (state) => {
            state = {
                success: '',
                error: ''
            }
            return state
        }
    }
})

export default notificationSlice.reducer
export const { clearNotification, createNotification } = notificationSlice.actions

export const setNotification = (message, type, time) => {
    return async dispatch => {
        const timeInMiliseconds = time * 1000
        dispatch(createNotification({ message, type }))
        setTimeout(() => dispatch(clearNotification()), timeInMiliseconds)
        
    }
}