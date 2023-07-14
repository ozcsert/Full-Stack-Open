
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


  export default Contacts;