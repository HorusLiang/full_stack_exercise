import React from "react";
import { useState,useEffect } from 'react'
import ReactDOM from "react-dom";
import noteService from "./services/notes"
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([
    { id:1, name: 'Arto Hellas', number: '123456' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('') // using string rather than number to store for better convenient processing
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then((res) => {
        setPersons(res);
      })
      .catch((err) => alert(err));
  }, []);

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const hasPerson = persons.some(person => person.name === newName)
    if(hasPerson){
      alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
      const person = persons.find(person => person.name === newName)
      const newPerson = { name: newName, number:newNumber,id:person.id}
      
      const code=noteService.updatePerson(person.id,newPerson)
      console.log(code)

      const newPersons = persons.map(person => {
        if (person.name === newName) {
          return newPerson;
        }
        return person;
      });
      setPersons(newPersons)

      
    }else{
      const newPerson = { name: newName, number:newNumber}
      setErrorMessage(newName+" is added")
      setTimeout(() => {
        setErrorMessage(null)
      }, 1000)
      noteService.create(newPerson).then((res) => {
        setPersons(persons.concat(res));
        setNewName("");
        setNewNumber("");
      });
      
    }
  }
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const [newFilter, setNewFilter] = useState('')
  const handleChangeFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDelete = (person) => {
    const confirmed=window.confirm("Delete "+person.name+"?") // window.confirm receives single parameter
    if(confirmed){
      const code=noteService.deleteById(person.id)
      console.log("here ",code)
      if(code===200){
        setPersons(persons.filter((person,i)=>i!==person.id)) // why can't disappear ???
      }
    }
    
  }

  
  // if without onChange, then input can't edit at all
  // newName here means the initial value and also the freshed value
  return (
    <div>
      {Notification(errorMessage)}
      <h2>Phonebook</h2>
      <Filter handleChangeFilter={handleChangeFilter} value={newFilter}/>
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newName={newName}
        handleChangeNumber={handleChangeNumber}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        newFilter={newFilter}
        handleDelete={handleDelete}
      />
      
      
    </div>
  )
}
const Filter=({handleChangeFilter,newFilter})=>(
  <p> filter shown with <input onChange={handleChangeFilter} value={newFilter}/> </p>
)
const Persons=({persons,newFilter,handleDelete})=>(
  <div>
        {
          persons.filter(person=> person.name.toLowerCase().includes(newFilter.toLowerCase()))
          .map(filtedPerson=> (
            <>
              <p key={filtedPerson.name}>{filtedPerson.name} {filtedPerson.number} <button onClick={()=>handleDelete(filtedPerson)}>delete</button> </p>
            </>
              
            ))
        }
  </div>
)

const PersonForm=({handleSubmit,handleChange,newName,handleChangeNumber,newNumber})=>{
  return (
    <>
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
    </>
  // button type here ???
  )
}

const Notification = (message) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

export default App