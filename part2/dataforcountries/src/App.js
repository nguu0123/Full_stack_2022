import { useState, useEffect } from 'react'
import axios from 'axios'
const ShowCountryData = ({ country }) => {
  return (
    <div id={country.id}>
      <h2> {country.name.common}</h2>
      <div>
        <p>capital {country.capital} <br /> area {country.area}  </p>
      </div>
      <div>
        <h2> languages</h2>
        <ul>
          {Object.values(country.languages).map((language, i) =>
            <li key={i}> {language} </li>
          )}
        </ul>
      </div>
      <img src={Object.values(country.flags)[0]} alt='Switzerland '></img>
    </div>
  )
}
const ShowButton = (id, country) => {
  function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.innerHTML === "Hello") {
      x.innerHTML = "Swapped text!";
    } else {
      x.innerHTML = "Hello";
    }
  }
  return [
    <button key={id}>Show </button>
  ]
}


const Filter = ({ countryFind, persons }) => {
  if (countryFind !== '') {
    const filterCountries = persons.filter(country => country.name.common.toLowerCase().includes(countryFind.toLowerCase()))
    if (filterCountries.length === 1) {
      return <ShowCountryData country={filterCountries[0]} />
    }
    else if (filterCountries.length <= 10)
      return (
        <div>
          {filterCountries.map((country, i) =>
            <div key={i} >
              {country.name.common} <ShowButton id={i} />
              <ShowCountryData country={country} />
            </div>
          )}

        </div>
      )
    else {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    }
  }

}
const App = () => {
  const [countries, setCountries] = useState([])
  const [countrySearch, setCountrySearch] = useState('')

  const handleCountrySearch = (event) => {
    setCountrySearch(event.target.value)
  }
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  return (
    <div>
      <h2> Phonebook</h2>
      <div>
        filter shown with <input value={countrySearch} onChange={handleCountrySearch} />
        <Filter countryFind={countrySearch} persons={countries} />
      </div>
    </div>
  )
}

export default App