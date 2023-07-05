import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('')
  return (
    <>
    <h2>Phonebook</h2>
    <form>
      <>
      name: <input />
      </>
      <>
      <button type="submit">add</button>
      </>
    </form>
    <h2>Numbers</h2>
    </>
  );
}

export default App;
