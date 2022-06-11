import { useState, useEffect } from 'react'
import axios from 'axios'

const ShowCountryData = ({ country, visible }) => {
  if (visible) {
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
  else {
    return null
  }
}
const ShowButton = ({ id, country }) => {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <div>
        {country.name.common}<button key={id} onClick={() => {
          setVisible(!visible)
        }}>Show </button>
      </div>
      <div>
        {<ShowCountryData country={country} visible={visible} />}
      </div>
    </div>

  )
}


const Filter = ({ countryFind, persons, api_key }) => {
  if (countryFind !== '') {
    const filterCountries = persons.filter(country => country.name.common.toLowerCase().includes(countryFind.toLowerCase()))
    if (filterCountries.length === 1) {
      const country = filterCountries[0]
      const location = country.capitalInfo.latlng
      return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=${api_key}`)
        .then(response => {
          (
            <div>
              <div>
                <ShowCountryData country={country} visible={true} />
              </div>
              <div>
                <h1> Weather in {country.capital}</h1>
                <p> temperature { }</p>
              </div>
            </div>
          )
        })

    }
    else if (filterCountries.length <= 10)
      return (
        <div>
          {filterCountries.map((country, i) =>
            <div key={i} >
              <ShowButton id={i} country={country} />
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
  const api_key = process.env.REACT_APP_API_KEY
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
        <Filter countryFind={countrySearch} persons={countries} api_key={api_key} />
      </div>
    </div>
  )
}

export default App