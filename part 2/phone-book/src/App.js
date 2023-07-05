import { useState } from 'react'
import './App.css';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number : 8985666,
      id: 1
  }
  ])

  const [newName, setNewName] = useState('enter a name')
  const [newNumber, setNewNumber] = useState("")
  const addPerson = (event) => {
    event.preventDefault()
    const contacts = {
      name : newName,
      id : persons.length+1,
      number : newNumber
    }
    if ( persons.find(person => person.name === newName)===undefined && newNumber != "") {
      setPersons(persons.concat(contacts))
      setNewName("")
    } else if  (newNumber === "") {
    alert("Please enter the number")
    } else
    alert(`${newName} is already added to phonebook`)   
  }

  const newValueChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const newNumberChange = (e) => {
    console.log(e.target.value)
    setNewNumber(e.target.value)
  }

  return (
    <>
    <h2>Phonebook</h2>
    <form onSubmit={addPerson}>
      <>
      <p>name: <input onChange={newValueChange} /></p>
      <p>number: <input onChange={newNumberChange} /></p>
      </>
      <>
      <button type="submit" >add</button>
      </>
    </form>
    <h2>Numbers</h2>
    <ul>
    {persons.map(person =>
      <li key={person.id}>
        {person.name} {person.number}
      </li>
      )}
      
    </ul>
    </>
  );
}

export default App;
