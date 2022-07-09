import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { appendAnecdote } from './anecdoteReducer'
import notificationReducer from './notificationReducer'
const Store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        // notification: notificationReducer
    }
})

export default Store