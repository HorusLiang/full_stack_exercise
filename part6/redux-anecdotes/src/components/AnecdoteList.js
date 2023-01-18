import {createAnecdote} from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'


const AnecdoteList=()=>{
    const anecdotes = useSelector(state => state)
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()
    const vote = (id) => {
        console.log('vote', id)
        dispatch({ type: 'VOTE', data: { id } })
      }
    return (
        <>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
      )
}
export default AnecdoteList