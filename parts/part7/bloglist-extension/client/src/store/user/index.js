import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from '../notification'
import loginService from '../../services/login'

const initialState = window.localStorage.getItem('usserSession')
    ? JSON.parse(window.localStorage.getItem('usserSession'))
    : null

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return state = action.payload
        }
    }
})

export default userSlice.reducer
export const { setUser } = userSlice.actions

export const login = (loginForm) => {
    return async dispatch => {
        try {
            const user = await loginService.login(loginForm)
            window.localStorage.setItem('usserSession', JSON.stringify(user))
            dispatch(setUser(user))
        } catch (error) {
            dispatch(setNotification('incorrect username or password', 'error', 5))
            console.log(error)
        }
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch(setUser(null))
        window.localStorage.removeItem('usserSession')
    }
}