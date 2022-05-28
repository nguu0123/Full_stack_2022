import { useState, useEffect } from 'react'
import axios from 'axios'
const ShowCountryData = ({ country }) => {
  const img = document.createElement(Object.values(country.flags)[0]);

  img.src = src;
  document.body.appendChild(img);
  return (
    <div>
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
      <h1 id="flag">
        {console.log(Object.values(country.flags))}
      </h1>
    </div>
  )
}
const ShowButton = ({ country }) => {
  const handleClick = () => {
    var p = document.getElementById("paragraph");
    p.style.display = "block";
  }
  return (
    <div>
      <button onClick={handleClick}>Show </button>
      <div id={"paragraph"}>
        hello
      </div>
    </div>

  )
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
            <div key={i} > {country.name.common} <ShowButton country={country} /> </div>
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