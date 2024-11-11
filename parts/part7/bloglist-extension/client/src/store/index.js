import { configureStore } from '@reduxjs/toolkit'
import notificationSlice from './notification'
import blogSlice from './blog'
import loginSlice from './login'
import usersSlice from './users'

const store = configureStore({
    reducer: {
        notification: notificationSlice,
        blog: blogSlice,
        loginInfo: loginSlice,
        users: usersSlice
    }
})

export default store