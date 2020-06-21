import React from 'react'

const Total = ({ parts }) => {//used reduce
    const sum = parts.reduce((total, {exercises}) => total + exercises,0)
    return(
      <p><strong>total of {sum} exercises </strong></p>
    ) 
}

export default Total