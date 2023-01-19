import { createSlice,current } from '@reduxjs/toolkit'
import {changeNotification} from './notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }
// const initialState = anecdotesAtStart.map(asObject)

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