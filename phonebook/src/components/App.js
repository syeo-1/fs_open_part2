import React, { useState } from 'react'

const Numbers = ({persons}) => {
  return (
    persons.map(person =>
      <p key={person.name}>
        {person.name}
      </p>
    )
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    //console.log('button click', event.target);
    const nameObject = {
      name: newName,
      //id: persons.length + 1,
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }
  
  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
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