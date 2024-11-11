import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from '../notification'
import loginService from '../../services/login'

const initialState = window.localStorage.getItem('usserSession')
    ? JSON.parse(window.localStorage.getItem('usserSession'))
    : null

const loginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoginInfo: (state, action) => {
            return state = action.payload
        }
    }
})

export default loginSlice.reducer
export const { setLoginInfo } = loginSlice.actions

export const login = (loginForm) => {
    return async dispatch => {
        try {
            const user = await loginService.login(loginForm)
            window.localStorage.setItem('usserSession', JSON.stringify(user))
            dispatch(setLoginInfo(user))
        } catch (error) {
            dispatch(setNotification('incorrect username or password', 'error', 5))
            console.log(error)
        }
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch(setLoginInfo(null))
        window.localStorage.removeItem('usserSession')
    }
}