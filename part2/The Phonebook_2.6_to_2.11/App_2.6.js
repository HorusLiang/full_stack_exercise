import React from "react";
import { useState } from 'react'
import ReactDOM from "react-dom";


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = { name: newName }
    setPersons(persons.concat(newPerson))
    setNewName("") // this could clear the input in the box
  }
  // if without onChange, then input can't edit at all
  return (
    <div>
      <h2>Phonebook</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange} value={newName} type="text"/> 
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
        {persons.map((person) => {
          return <p key={person.name}>{person.name}</p>;
        })}
      </div>
      
    </div>
  )
}


export default App