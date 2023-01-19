import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import { configureStore } from '@reduxjs/toolkit'
import notificationReduer from './reducers/notificationReducer'


// const store = createStore(reducer)
const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReduer,
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)