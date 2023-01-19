import {createAnecdote} from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import React from 'react'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm= ()=>{
    const dispatch = useDispatch()
    const addAnecdote=async(event)=>{
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
      }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
        </>

    )
}
const ConnectedAnecdoteForm = connect()(AnecdoteForm)
export default ConnectedAnecdoteForm
