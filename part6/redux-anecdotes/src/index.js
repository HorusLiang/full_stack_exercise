import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import notificationReduer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteService from './services/anecdotes'
import anecdoteReducer, { appendAnecdote,setAnecdote } from './reducers/anecdoteReducer'


// const store = createStore(reducer)
const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReduer,
    filter:filterReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)