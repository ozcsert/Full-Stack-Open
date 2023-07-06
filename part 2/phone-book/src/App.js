import { useState } from 'react'
import './App.css';

const InputChangeLine = ({ text, onChange, value, onClick}) => {
  return (
  <>
  <p>{text} <input value={value} onClick={onClick} onChange={onChange}/></p>
  </>
  )
}

const Form = ({onSubmit, newNameChange, newNumberChange, name, number, newName, newNumber, deleteInput}) => {
  return (
    <form onSubmit={onSubmit}>
      <InputChangeLine text={name} value={newName} onClick={deleteInput} onChange={newNameChange} />
      <InputChangeLine text={number} value={newNumber} onClick={deleteInput} onChange={newNumberChange} />
      <>
        <button type="submit" >add</button>
      </>
    </form>
  )
}

const Header = ({text}) => <h2>{text}</h2>

const Contacts = ({newFilter, persons, filteredPersons,}) => {
  return (
    <ul>
    {(newFilter === "filter by..." || newFilter == "") 
    ?
    persons.map(person =>
      <li key={person.id}>
        {person.name} {person.number}
      </li>
      )
    :
    filteredPersons.map(person =>
      <li key={person.id}>
        {person.name} {person.number}
      </li>
      )}
    </ul>
  )
  
} 

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('enter a name...')
  const [newNumber, setNewNumber] = useState("and the number...")
  const [newFilter, setNewFilter] = useState("filter by...")
  const addPerson = (event) => {
    event.preventDefault()
    const contacts = {
      name : newName,
      id : persons.length+1,
      number : newNumber
    }
    if ( persons.find(person => person.name.toUpperCase() === newName.toUpperCase())===undefined && newNumber != "") {
      setPersons(persons.concat(contacts))
      setNewName("")
      setNewNumber("")
    } else if  (newNumber === "") {
    alert("Please enter the number")
    } else
    alert(`${newName} is already added to phonebook`)   
  }

  const newNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const newNumberChange = (e) => {
    console.log(e.target.value)
    setNewNumber(e.target.value)
  }

  const searchFilterChange = (a) => {
    console.log(a.target.value)
    setNewFilter(a.target.value)
    console.log(newFilter)
  }

  const deleteInput = (a) => {
    console.log(a.target.value)
    a.target.value = ""
    
  }
  const filteredPersons = persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase() || newFilter == 'filter by...'))
  
  return (
    <>
    <Header text="PhoneBook" />
    <InputChangeLine text="Search" value={newFilter} onClick={deleteInput} onChange={searchFilterChange} />
    <Header text="Create a contact" />
    <Form onSubmit={addPerson} deleteInput={deleteInput}  name="name" newName={newName} newNameChange={newNameChange} number="number" newNumber={newNumber} newNumberChange={newNumberChange}  />
    <Header text="Contacts" />
    <Contacts newFilter={newFilter} persons={persons} filteredPersons={filteredPersons} />
    </>
  );
}

export default App;
