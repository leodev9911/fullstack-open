import { createSlice } from '@reduxjs/toolkit'
import usersService from '../../services/users'
import { setNotification } from '../notification'

const initialState = []

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsersAction: (state, action) => {
            return state = [...action.payload]
        }
    }
})

export default usersSlice.reducer
export const { setUsersAction } = usersSlice.actions

export const setUsers = () => {
    return async dispatch => {
        try {
            const users = await usersService.fetchAllUsers()
            dispatch(setUsersAction(users))
        } catch (error) {
            dispatch(setNotification('There was an error fetching the users, please reload your browser.'))
            console.log(error)
        }
    }
}