import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from './reducers/anecdotesReducer'
import filterReducer from './reducers/filterReducer'
import notificationsReducer from './reducers/notificationsReducer'

const store = configureStore({
    reducer: {
        anecdotes: anecdotesReducer,
        filter: filterReducer,
        notifications: notificationsReducer
    }
})

export default store