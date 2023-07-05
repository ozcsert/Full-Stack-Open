  const Header = ({ course, text }) => {
    return (
      <>
        <h1> {text} </h1>
        <h2> {course}</h2>
      </>
    );
  };
  
  const Part = ({ part }) => {
    return (
        <li>
          {part.name} {part.exercises}
        </li>
    );
  };
  
  const Content = ({ parts }) => {
  console.log(parts)
    return (
      <>
        <ul >
          {parts.map(part => 
            <Part key={part.id} part={part} />)}
        </ul>
      </>
    );
  };
  
  const Total = ({ parts }) => {
    const total = parts.reduce((s, order) => s + order.exercises, 0);
    return <p>Total number of exercises {total}</p>;
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
        <Header text="Web Development Curriculum"/>
        <Header course={course[0].name} />
        <Content parts={course[0].parts} />
        <Total parts={course[0].parts} />
        <Header course={course[1].name} />
        <Content parts={course[1].parts} />
        <Total parts={course[1].parts} />
      </>
    );
  };





export default Course;



