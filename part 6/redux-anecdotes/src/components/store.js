import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import anecdoteReducer from '../reducers/anecdoteReducer';
import filterReducer from '../reducers/filterReducer';
import notificationReducer from '../reducers/notificationReducer';
import thunk from 'redux-thunk'

const store = configureStore({
    reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification : notificationReducer,
    },
    middleware: [thunk]
})

export default store


