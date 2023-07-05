import { useState } from 'react'
import './App.css';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number : +90-552-8985666,
      id: 1
  }
  ])

  const [newName, setNewName] = useState('enter a name')
  
  const addPerson = (event) => {
    event.preventDefault()
    console.log("person added", event.target)
    const contacts = {
      name : newName,
      id : persons.length+1
    }
    if ( persons.find(person => person.name === newName)===undefined) {
      setPersons(persons.concat(contacts))
      setNewName("")
    } alert(`${newName} is already added to phonebook`)
      
  }


  const newValueChange = (event) => {

    console.log(event.target.value)
    setNewName(event.target.value)

  }

  return (
    <>
    <h2>Phonebook</h2>
    <form onSubmit={addPerson}>
      <>
      name: <input onChange={newValueChange} />
      </>
      <>
      <button type="submit" >add</button>
      </>
    </form>
    <h2>Numbers</h2>
    <ul>
    {persons.map(person =>
      <li key={person.id}>
        {person.name}
      </li>
      )}
      
    </ul>
    </>
  );
}

export default App;
