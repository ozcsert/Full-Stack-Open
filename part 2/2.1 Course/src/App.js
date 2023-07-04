const Header = ({ course }) => {
  return (
    <>
      <h1> {course}</h1>
    </>
  );
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {" "}
      {part} {exercises}{" "}
    </p>
  );
};

const Content = ({ parts }) => {
 
  return (
    <>
      <Part part={parts[0].name} exercises={parts[0].exercises} />
      <Part part={parts[1].name} exercises={parts[1].exercises} />
      <Part part={parts[2].name} exercises={parts[2].exercises} />
      <Part part={parts[3].name} exercises={parts[3].exercises} />
      
    </>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((s, order) => s + order.exercises, 0);
  return <p>Number of exercises {total}</p>;
};


const Course = () => {
  const course = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  console.log(course[0].name)
  return (
    <>
      <Header course={course[0].name} />
      <Content parts={course[0].parts} />
      <Total parts={course[0].parts} />
      <Header course={course[1].name} />
      <Content parts={course[0].parts} />
      <Total parts={course[1].parts} />
      
    </>
  );
};

const App = (course) => {
  return (
    <>
      <Course course={course} />
    </>
  );
};

export default App;
