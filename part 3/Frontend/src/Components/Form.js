import InputChangeLine from "./InputChangeLine"

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

export { InputChangeLine, Form }