import {vote} from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'


const AnecdoteList=()=>{
    const anecdotes = useSelector(state => state).anecdotes // could return multiple reduer state, name is refered to index
    const dispatch = useDispatch()
    const voteFor = (id) => {
        console.log('vote', id)
        dispatch(vote(id))
    }
    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteFor(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
      )
}
export default AnecdoteList