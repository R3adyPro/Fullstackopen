import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducerSlice, { anecSet } from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducerSlice,
    filter: filterReducer,
    notification: notificationReducer
  }
})

anecdoteService.getAll().then(anecs=> {
    store.dispatch(anecSet(anecs))
})

export default store