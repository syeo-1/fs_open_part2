import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Total = ({ parts }) => {//used reduce
  const sum = parts.reduce((total, {exercises}) => total + exercises,0)
  return(
    <p><strong>total of {sum} exercises </strong></p>
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
      <Total parts={parts} />
    </div>
  )
}

const Courses = ({courses}) => {
  return (
    <div>
      {courses.map(course =>
        <Course course={course} />
      )}
    </div>
  )
}

const App = () => {
  const courses = [
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

  return(
    <div>
      <Courses courses={courses} />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))