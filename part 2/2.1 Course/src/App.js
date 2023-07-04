
const Header = (props) => {
  return (
    <>
    <h1> {props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <p> {props.part} {props.exercises} </p>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const Course = () => {
  const course = {
    id: 1,
    name : 'Half Stack application development',
    parts : [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        id: 3,
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        id: 4,
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
    <Header course = {course.name}/> 
    <Content parts = {course.parts} />
    </>
  )
}

const App = (course) => {
  
  return (
    <>
    <Course course={course}/>
    </>
  )
}

export default App;