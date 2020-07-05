import React, { useState, useEffect } from 'react'
import personService from './persons'

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

const Person = ({name, number, deletePrompt}) => (
  <li>{name} {number} <button onClick={deletePrompt}>delete</button></li>
)

// const Persons = ({persons, setPersons}) => {

  
//   return (
//     <div>
//     </div>
//   )
// }

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterNumbers, setFilterNumbers] = useState(true)
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    // console.log('effect')
    personService
      .getAllPersons()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  // console.log('render', persons.length, 'persons')

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

    if (!alreadyInPersons) {
      personService
        .addPerson(nameObject)
        .then(response => {setPersons(persons.concat(response.data))})
      // setPersons(persons.concat(nameObject))
      // console.log("persons:", persons)
      // console.log("hey")
    } else {
      alert(`${nameObject.name} is already added to phonebook`)
    }

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

  
  
  // console.log(persons);
  
  const handleSearchString = (event) => {
    // console.log(event.target.value);
    setSearchString(event.target.value)

    searchString.length === 0 ? setFilterNumbers(false) : setFilterNumbers(true)
    
    
    // console.log("persons to show", personsToShow);
    
    // setPersons(personsToShow)
  }
  
  const deletePrompt = (id, name) => {
    // console.log(person)
    if (window.confirm(`Delete ${name} ?`)) {
      personService.deletePerson(id)
      setPersons(persons.filter(person => person.id !== id))
      // personService
      //   .deletePerson(id)
      //   .then(response => {
      //     console.log("response data:", response.data)
      //     setPersons(response.data)
      //   })
        // .then(
        //   personService
        //     .getAllPersons()
        //     .then(response => {
        //       console.log(response.data)
        //       setPersons(response.data)
        //     })
        // )
    }

    console.log(`${name} with ${id} option checked`);
    
  }
  const personsToShow = filterNumbers 
    ? persons.filter(person => person.name.toLowerCase().includes(searchString))
    : persons 
  
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
      <div>
        <ul>
          {personsToShow.map((person, i) =>
            <Person 
            key={i}
            name={person.name}
            number={person.number} 
            deletePrompt={() => deletePrompt(person.id, person.name)}
          />
          )}
        </ul>
      </div>
    </div>
  )
}

export default App