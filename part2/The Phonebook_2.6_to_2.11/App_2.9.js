import React from "react";
import { useState } from 'react'
import ReactDOM from "react-dom";


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123456' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('') // using string rather than number to store for better convenient processing

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const hasPerson = persons.some(person => person.name === newName)
    if(hasPerson){
      alert(`${newName} is already added to phonebook`)
    }else{
      const newPerson = { name: newName, number:newNumber}
      setPersons(persons.concat(newPerson))
      setNewName("") // this could clear the input in the box
      setNewNumber("")

    }
  }

  const [newFilter, setNewFilter] = useState('')
  const handleChangeFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }
  // if without onChange, then input can't edit at all
  // newName here means the initial value and also the freshed value
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input onChange={handleChangeFilter} value={newFilter}/> 
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange} value={newName} type="text"/> 
          <br/>
          number: <input onChange={handleChangeNumber} value={newNumber} type="text"/> 
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
        {
          persons.filter(person=> person.name.toLowerCase().includes(newFilter.toLowerCase()))
          .map(filtedPerson=> ( <p key={filtedPerson.name}>{filtedPerson.name} {filtedPerson.number}</p>) )
        }
      </div>
      
    </div>
  )
}


export default App