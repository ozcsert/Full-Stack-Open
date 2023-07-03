import { useState } from "react";

const StatisticLine = (props) => {
  return (
    <p> {props.text} {props.value}</p>
  )
}

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
    <StatisticLine text="good" value={props.goodVal} />
    <StatisticLine text="neutral" value={props.neutralVal} />
    <StatisticLine text="bad" value={props.badVal} />
    <StatisticLine text="all" value={props.average} />
    <StatisticLine text="average" value={props.positive} />
    </>
  )
}

const Button = (props) => {
  return (
    <>
    <button 
    onClick={props.onClick} >{props.text}
    </button>
    </>
  )
}

  const  App = () => {

  const [goodVal, setGoodVal] = useState(0)
  const [neutralVal, setNeutralVal] = useState(0)
  const [badVal, setBadVal] = useState(0)


  const allCounter = () =>  goodVal + badVal + neutralVal

  const average = () => (goodVal - badVal) / (goodVal + neutralVal + badVal)

  const positive = () => (goodVal) / (goodVal + neutralVal + badVal) *100 

  return (
    <>
      <h1>Give Feedback</h1>
      <Button  onClick={() => setGoodVal(goodVal +1)} text="good" />
      <Button  onClick={() => setNeutralVal(neutralVal +1)} text="neutral" />
      <Button  onClick={() => setBadVal(badVal+1)} text="bad" />
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







