import { useState } from 'react'
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
const Persons = ({ persons }) => {
  return (
    <div>
      {
        persons.map((person, i) =>
          <div key={i}>
            {person.name} {person.number}
          </div>
        )
      }
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newPhoneNumber
    }
    if (persons.map(person => person.name).includes(newName))
      window.alert(`${newName} is already added to phonebook`)
    else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewPhoneNumber('')
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
      <Persons persons={persons} />
    </div>
  )
}

export default App