import { useState } from "react";





function App() {

  const [value, setValue] = useState({
    good : 0,
    neutral : 0,
    bad : 0
  })

  const counterGood = () => {
    setValue({...value , good : value.good + 1})
    console.log("good")
  }

  const counterNeutral = () => {
    setValue({...value , neutral : value.neutral + 1})
    console.log("neutral")
  }

  const counterBad = () => {
    setValue({...value , bad : value.bad + 1})
    console.log("bad")
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <button onClick={counterGood}>good</button>
      <button onClick={counterNeutral}>neutral</button>
      <button onClick={counterBad}>bad</button>
      <h1>Statistics</h1>
      <p >good {value.good} </p>
      <p >neutral {value.neutral} </p>
      <p >bad {value.bad} </p>
    </>
  );
}

export default App;


