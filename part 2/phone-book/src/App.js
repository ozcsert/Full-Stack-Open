import { useEffect, useState } from 'react'
import './App.css';

import personService from './services/persons'

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

const Contacts = ({newFilter, persons, filteredPersons, deleteContactOf}) => {
  return (
    <ul>
    {(newFilter === "filter by..." || newFilter == "") 
    ?
    persons.map(person =>
      <li key={person.id}>
        {person.name} {person.number}
        <button type="button" onClick={() =>deleteContactOf(person.id)} >delete</button>
      </li>
      )
    :
    filteredPersons.map(person =>
      <li key={person.id}>
        {person.name} {person.number}
        <button type="button" onClick={() =>deleteContactOf(person.id)}  >delete</button>
      </li>
      )}
    </ul>
  )
  
} 

function App() {
  const [persons, setPersons] = useState([])
  
  //Get the data from the server(db.json).

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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

    if (persons.find(person => person.name.toUpperCase() === newName.toUpperCase())===undefined && newNumber != "and the number..." && newNumber != "") {
      //New posts are saved to the db
      personService
        .create(contacts)
        .then(response => {
          setPersons(persons.concat(response))
        },[])
        setNewName('enter a name...')
        setNewNumber("and the number...")
    } else if  (persons.find(person => person.name.toUpperCase() === newName.toUpperCase())!== ""  && newNumber === "and the number..." || newNumber === "") {
    alert("Please enter the number") 
  } else if (persons.find(person => person.name.toUpperCase() === newName.toUpperCase())) {
    if (window.confirm(`${newName.name} is already added to the phonebook, replace the old number with a new one ?`)) {
  //Finds the entered person and updates the new number with the old one.
  updateContact()
      }
  }
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

  const deleteContactOf = (id) => {
    const url = `http://localhost:3001/persons/${id}`
    const deletedPerson = persons.filter(n => n.id === id)
    const unaffectedPersons = persons.filter(n => n.id !== id)
    console.log(unaffectedPersons);
    if (window.confirm(`Do you really want to send ${deletedPerson[0].name} into oblivion?`)) {
    setPersons(unaffectedPersons)
    personService
      .remove(id)
      alert(`${deletedPerson[0].name} has been deleted from the list.`)
  }  }

  const updateContact = (id) => {
  
    const indexOfPerson = persons.map(e => e.name.toUpperCase()).indexOf(`${newName.toUpperCase()}`);
    const person = persons.filter((person) => person.name === newName)
    const obj = {number:newNumber}
    const changedPerson = {...persons[indexOfPerson], ...obj}//Object.assign(person, obj)
    console.log(indexOfPerson);
    personService
      .update(changedPerson.id, changedPerson)
      .then(returnedPerson => 
      setPersons(persons.map(person => person.id !== persons[indexOfPerson].id ? person: returnedPerson))
      )
      setNewName('enter a name...')
      setNewNumber("and the number...")
  }

  const filteredPersons = persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase() || newFilter == 'filter by...'))
  
  return (
    <>
    <Header text="PhoneBook" />
    <InputChangeLine text="Search" value={newFilter} onClick={deleteInput} onChange={searchFilterChange} />
    <Header text="Create a contact" />
    <Form onSubmit={addPerson} deleteInput={deleteInput}  name="name" newName={newName} newNameChange={newNameChange} number="number" newNumber={newNumber} newNumberChange={newNumberChange}  />
    <Header text="Contacts" />
    <Contacts newFilter={newFilter} persons={persons} filteredPersons={filteredPersons} deleteContactOf={deleteContactOf} />
    </>
  );
}

export default App;
