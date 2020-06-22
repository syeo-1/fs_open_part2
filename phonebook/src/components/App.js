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
  }
  
  const handleNewName = (event) => {
    // console.log(event.target.value);
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