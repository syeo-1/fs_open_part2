import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({searchString, handleSearchString}) => (
  <form>
    <div>
      filter shown with <input value={searchString} onChange={handleSearchString}/>
    </div>
  </form>
)

const PersonForm = ({addData, newName, newNumber, handleNewName, handleNewNumber}) => (
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
)

const Persons = ({persons}) => {
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
  const [filterNumbers, setFilterNumbers] = useState(true)
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

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
  
  // be aware that var on left of equals (eg. searchString) is the prop var
  // and the value it is being set to is the searchString in App component
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchString={searchString} handleSearchString={handleSearchString}/>
      <h2>add a new</h2>
      <PersonForm 
        addData={addData}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App