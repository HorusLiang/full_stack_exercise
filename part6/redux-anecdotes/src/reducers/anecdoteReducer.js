import { createSlice,current } from '@reduxjs/toolkit'
import {changeNotification} from './notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const getId = () => (100000 * Math.random()).toFixed(0)
const initialState=[]
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const curState=current(state)
      return curState.concat(
          action.payload,
      )
    },
    appendAnecdote(state,action){
      const curState=current(state)
      return curState.concat(
        action.payload,
      )
    },
    setAnecdote(state,action){
      return action.payload
    },
    vote(state, action){
      const id = action.payload
      const curState=current(state)
      const anecdoteToChange = curState.find(n => n.id === id)
        const changedAnecdote = {
          ...anecdoteToChange,
          votes: anecdoteToChange.votes + 1
        }
        return curState.map(anecdote =>
          anecdote.id !== id ? anecdote : changedAnecdote
        )
    }
  }
})
export const { createAnecdote,vote,appendAnecdote,setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer