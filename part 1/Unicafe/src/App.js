



import { useState } from "react";

function App() {

  const [goodValue, setGoodValue] = useState(0)
  const [neutralVal, setNeutralVal] = useState(0)
  const [badVal, setBadVal] = useState(0)


  const allCounter = (a,b,c) =>  a + b + c

  const average = () => (goodValue - badVal) / (goodValue + neutralVal + badVal)

  const positive = () => (goodValue) / (goodValue + neutralVal + badVal) *100 
  return (
    <>
      <h1>Give Feedback</h1>
      <button onClick={() => setGoodValue(goodValue +1)}>good</button>
      <button onClick={() => setNeutralVal(neutralVal +1)}>neutral</button>
      <button onClick={() => setBadVal(badVal+1)}>bad</button>
      <h1>Statistics</h1>
      <p >good {goodValue} </p>
      <p >neutral {neutralVal} </p>
      <p >bad {badVal} </p>
      <p>all {allCounter(goodValue,badVal,neutralVal)}</p>
      <p>average {average()} </p>
      <p>positive {positive()} %</p>
      
    </>
  );
}

export default App;







