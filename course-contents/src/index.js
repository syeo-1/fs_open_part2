import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Total = ({ course }) => {
  const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>)}
    </div>
  )
}

const Course = ({course}) => {//how to decompose object in prop?
  //should I decompose object in prop? bad practice?
  const {id, name, parts} = course
  console.log("id", id);
  console.log("name", name);
  console.log("parts", parts);
  
  
  
  return (
    <div>
      <Header text={name} />
      <Content parts={parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))