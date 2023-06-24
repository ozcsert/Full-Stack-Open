
const Header = (props) => {
  return (
    <>
    <h1> {props.course}</h1>
    </>
  )
  }

const Part = (props) => {
  return (
    <p> {props.part}, {props.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <> 
      <Part part = "Fundamentals of React" exercises = "10"  />
      <Part part = "Using props to pass data" exercises = "7"/>
      <Part part = "State of a component" exercises = "14"/>
      </>
  )
}

const Total = (props) => {
  return (
    <>
    <p>Number of exercises, {props.exercises} </p>
    </>
  )
}

const App = () => {
  return (
    <>
    <Header course = 'Half Stack application development'/> 
    <Content />
    <Total exercises = {10 + 7 + 14}/>
    </>
  )
}

export default App;
