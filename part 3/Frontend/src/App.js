import { useEffect, useState } from 'react'
import Notification from './Components/Notification';
import personService from './services/persons'
import "./index.css"
import Contacts from './Components/Contacts';
import {InputChangeLine, Form} from './Components/Form'

const Header = ( {text} ) => <h2>{text}</h2>

const App = () => {
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
  const [message, setMessage] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()
    const contacts = {
      name : newName,
      id : persons.length+1,
      number : newNumber
    }

    if (persons.find(person => person.name.toUpperCase() === newName.toUpperCase())===undefined && newNumber != "and the number..." && newNumber != "") {
      personService //Adds new entries to db.json
        .create(contacts)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('enter a name...')
          setNewNumber("and the number...")
          setMessage(`${newName} has been added`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        },[])
    } else if  (persons.find(person => person.name.toUpperCase() === newName.toUpperCase())!== ""  && newNumber === "and the number..." || newNumber === "") {
        alert("Please enter the number") 
    } else if (persons.find(person => person.name.toUpperCase() === newName.toUpperCase())) {
          if (window.confirm(`${newName.name} is already added to the phonebook, replace the old number with a new one ?`)) {
            updateContact() //Api call to db to update the entry
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
    const deletedPerson = persons.filter(n => n.id === id)
    const unaffectedPersons = persons.filter(n => n.id !== id)
    console.log(unaffectedPersons);
    if (window.confirm(`Do you really want to send ${deletedPerson[0].name} into oblivion?`)) {
      setPersons(unaffectedPersons)
      personService //Api call to db to delete the entry.
        .remove(id)
        .then(() => {
          setMessage(`${deletedPerson[0].name} has been deleted from the list.`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)})
        .catch(error => {
          setMessage(
            `Error; Contact ${deletedPerson[0].name} has already been removed from the server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
}}

  const updateContact = (id) => {
    const indexOfPerson = persons.map(e => e.name.toUpperCase()).indexOf(`${newName.toUpperCase()}`);
    const person = persons.filter((person) => person.name === newName)
    const obj = {number:newNumber}
    const changedPerson = {...persons[indexOfPerson], ...obj}//Object.assign(person, obj)
    personService //Api call to db to update the entry.
      .update(changedPerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== persons[indexOfPerson].id ? person: returnedPerson))
          setNewName('enter a name...')
          setNewNumber("and the number...")
          setMessage(`Entry of ${newName } has been updated`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })  
      .catch(error => {
        setMessage(
          `Error; Contact ${newName} has already been removed from the server`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        })
}

  const filteredPersons = persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase() || newFilter == 'filter by...'))
  
  return (
    <>
    <Header text="PhoneBook" />
    <Notification message={message}/>
    <InputChangeLine text="Search" value={newFilter} onClick={deleteInput} onChange={searchFilterChange} />
    <Header text="Create a contact" />
    <Form onSubmit={addPerson} deleteInput={deleteInput}  name="name" newName={newName} newNameChange={newNameChange} number="number" newNumber={newNumber} newNumberChange={newNumberChange}  />
    <Header text="Contacts" />
    <Contacts newFilter={newFilter} persons={persons} filteredPersons={filteredPersons} deleteContactOf={deleteContactOf} />
    </>
  );
}

export default App;
