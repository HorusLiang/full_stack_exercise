import {vote} from '../reducers/anecdoteReducer'
import {changeNotification,hideNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'


const AnecdoteList=()=>{
    const anecdotes = useSelector(state => state).anecdotes // could return multiple reduer state, name is refered to index
    const dispatch = useDispatch()
    const voteFor = (id) => {
        console.log('vote', id)
        dispatch(vote(id))
        const contentToChange = anecdotes.find(n => n.id === id).content
        dispatch(changeNotification("your voted for '"+contentToChange+"'"))
        setTimeout(() => {
            dispatch(hideNotification());
          }, 1000);
        
    }
    const inputText=useSelector(state => state).filter
    const filteredAnecdotes=anecdotes.filter(item=>{
        return item.content.toLowerCase().includes(inputText.toLowerCase())
    })
    return (
        <>
            {filteredAnecdotes.map(anecdote =>
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