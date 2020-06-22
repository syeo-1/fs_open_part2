import React, { useState } from 'react'

const Numbers = ({persons}) => {
  return (
    persons.map(person =>
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    )
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addData = (event) => {
    event.preventDefault()
    //console.log('button click', event.target);
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    // can't compare objects directly in JS!!!
    // can use JSON.stringify if you really want to use includes/some methods

    let alreadyInPersons = false
    for (let i = 0 ; i < persons.length ; i++) {      
      if (nameObject.name === persons[i].name) {
        alreadyInPersons = true
      }
    }

    !alreadyInPersons
     ? setPersons(persons.concat(nameObject))
     : alert(`${nameObject.name} is already added to phonebook`)


    setNewName('')
    setNewNumber('')
  }
  
  const handleNewName = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value)
  }
  
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addData}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons}/>
    </div>
  )
}

export default App