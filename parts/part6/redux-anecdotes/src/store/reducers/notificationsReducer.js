import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        notification(state, action) {
            const content = action.payload

            return state = content
        },
        clearNotification(state) {
            state = ''

            return state
        },
    }
})

export const { notification, clearNotification } = notificationsSlice.actions
export default notificationsSlice.reducer

export const setNotification = (content, time) => {
    return async dispatch => {
        const timeInMiliseconds = time * 1000
        dispatch(notification(content))
        setTimeout(() => dispatch(clearNotification()), timeInMiliseconds)
    }
} 