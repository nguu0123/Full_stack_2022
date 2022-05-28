import { useState, useEffect } from 'react'
import phoneService from './services/persons'


const Filter = ({ nameFind, persons }) => {
  if (nameFind !== '') {
    return (
      <div>
        {persons.filter(person => person.name.includes(nameFind)).map((person, i) =>
          <p key={i}>{person.name} {person.number} </p>
        )}
      </div>
    )
  }
}
const PersonForm = ({ addName, newName, handleNameChange, newPhoneNumber, handlePhoneChange }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input
          value={newPhoneNumber}
          onChange={handlePhoneChange}
        />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, setPersons }) => {
  return (
    <div>
      {
        persons.map((person, i) =>
          <div key={i}>
            {person.name} {person.number}
            <button onClick={() => {
              if (window.confirm(`Delete ${person.name}?`)) {
                phoneService.deletePhone(person.id)
                  .then(response => setPersons(persons.filter(n => n.id !== person.id)))
              }
            }}>
              delete</button>
          </div>
        )
      }
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newPhoneNumber
    }
    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} already added to phonebook, replace the old number with the new one?`)) {
        const id = persons.find(person => person.name === newName).id
        phoneService.update(id, nameObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== id ? person : response))
            setNewName('')
            setNewPhoneNumber('')
          })
      }
    }
    else {
      phoneService.create(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewPhoneNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }
  const handleNameSearch = (event) => {
    setNameSearch(event.target.value)
  }
  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPhone => {
        setPersons(initialPhone)
      })
  }, [])
  return (
    <div>
      <h2> Phonebook</h2>
      <div>
        filter shown with <input value={nameSearch} onChange={handleNameSearch} />
        <Filter nameFind={nameSearch} persons={persons} />
      </div>
      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newPhoneNumber={newPhoneNumber} handlePhoneChange={handlePhoneChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App