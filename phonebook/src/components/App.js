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
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterNumbers, setFilterNumbers] = useState(true)
  const [searchString, setSearchString] = useState('')

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

  
  const personsToShow = filterNumbers 
    ? persons.filter(person => person.name.toLowerCase().includes(searchString))
    : persons 
  const handleSearchString = (event) => {
    // console.log(event.target.value);
    setSearchString(event.target.value)

    searchString.length === 0 ? setFilterNumbers(false) : setFilterNumbers(true)
    
    
    // console.log("persons to show", personsToShow);
    
    // setPersons(personsToShow)
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input value={searchString} onChange={handleSearchString}/>
        </div>
      </form>
      <h2>add a new</h2>
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
      <Numbers persons={personsToShow}/>
    </div>
  )
}

export default App