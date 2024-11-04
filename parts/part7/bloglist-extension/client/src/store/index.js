import { configureStore } from '@reduxjs/toolkit'
import notificationSlice from './notification'
import blogSlice from './blog'
import userSlice from './user'

const store = configureStore({
    reducer: {
        notification: notificationSlice,
        blog: blogSlice,
        user: userSlice
    }
})

export default store