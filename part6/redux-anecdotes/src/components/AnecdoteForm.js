import {createAnecdote} from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'

const AnecdoteForm=()=>{
    const dispatch = useDispatch()
    const addAnecdote=(event)=>{
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
      }
    return (
        <>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
        </>

    )
}
export default AnecdoteForm