const InputChangeLine = ({ text, onChange, value, onClick}) => {
    return (
    <>
    <p>{text} <input value={value} onClick={onClick} onChange={onChange}/></p>
    </>
    )
  }
  

export default InputChangeLine;