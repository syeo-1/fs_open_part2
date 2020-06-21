import React from 'react'
import Total from './Total'
import Content from './Content'
import Header from './Header'


const Course = ({course}) => {//how to decompose object in prop?
    const {name, parts} = course
    
    return (
      <div>
        <Header text={name} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
    )
}

export default Course