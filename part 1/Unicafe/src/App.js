



import { useState } from "react";

const Statistics = (props) => {
  if(props.allCounter === 0) {
    return (
      <>
      <h1>Statistics</h1>
      <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
    <h1>Statistics</h1>
    <p> {props.text} {props.goodVal}</p>
    <p> {props.text2} {props.neutralVal}</p>
    <p> {props.text3} {props.badVal}</p>
    <p> {props.text4} {props.allCounter}</p>
    <p> {props.text5} {props.average} </p>
    <p> {props.text6} {props.positive}</p>
    </>
  )
}

function App() {

  const [goodVal, setGoodVal] = useState(0)
  const [neutralVal, setNeutralVal] = useState(0)
  const [badVal, setBadVal] = useState(0)


  const allCounter = () =>  goodVal + badVal + neutralVal

  const average = () => (goodVal - badVal) / (goodVal + neutralVal + badVal)

  const positive = () => (goodVal) / (goodVal + neutralVal + badVal) *100 
  return (
    <>
      <h1>Give Feedback</h1>
      <button onClick={() => setGoodVal(goodVal +1)}>good</button>
      <button onClick={() => setNeutralVal(neutralVal +1)}>neutral</button>
      <button onClick={() => setBadVal(badVal+1)}>bad</button>
      <Statistics 
      text="good" goodVal={goodVal}
      text2="neutral" neutralVal={neutralVal}
      text3="bad" badVal={badVal}
      text4="all" allCounter={allCounter()}
      text5="average" average={average()}
      text6="positive" positive={positive()}
      />
    </>
  );
}

export default App;







