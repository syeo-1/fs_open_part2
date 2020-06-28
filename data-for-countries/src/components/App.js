import React, {useState, useEffect} from 'react';
import axios from 'axios'

const CountryFilter = ({countryString, handleCountrySearch, numMatches}) => {
  return (
    <form>
      <div>
        find countries <input value={countryString} onChange={handleCountrySearch}/>
      </div>
    </form>
  )
}



const CountryData = ({countryNames, countries}) => {
  if (countryNames.length === 1) {
    const countryData = countries.filter(country => country.name === countryNames[0])[0]
    console.log('countryData', countryData);
    
    return (
        <div>
          <h1>{countryData.name}</h1>
          <p>capital {countryData.capital}</p>
          <p>population {countryData.population}</p>
          <h2>languages</h2>
          <ul>
            {countryData.languages.map(language => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <img src={`${countryData.flag}`} alt={`${countryData.name}'s flag`} width="300px" height="300px"/>
        </div>
    )
  } else if (countryNames.length <= 10 && countryNames.length > 1) {
    return (
      countryNames.map(country => <p key={country}>{country}</p>)
    )
  } else if (countryNames.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  return (
    <div>
      {/* <p>please enter a search</p> */}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryNames, setCountryNames] = useState([])
  useEffect(() => {
    // console.log("effect");
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        // console.log("promise fulfilled");
        // const countryNames = response.data.map(data => (
        //   data.name
        // ))
        // console.log(response.data);
        
        // const countryNames = response.data.map(countryData => {
        //   countryData.name
        // })
        
        setCountries(response.data)
        setCountryNames(response.data.map(data => (data.name)))
      })
  }, [])
  const [searchString, setSearchString] = useState('')
  
  // don't care about which of 4 states to be in for display
  // all you need to care about is the length of countries
  // after filtering

  // only filter when there's something in the form
  const [filterCountryNames, setFilterCountries] = useState(false)
  const countryNamesToShow = filterCountryNames
    ? countryNames.filter(country => country.toLowerCase().includes(searchString))
    : countryNames
  // console.log("data", countriesToShow);
  const handleCountrySearch = (event) => {
    // console.log(event.target.value);
    
    setSearchString(event.target.value) 
    searchString.length === 0 ? setFilterCountries(false) : setFilterCountries(true)
    
    // setCountries(countriesToShow)
    // console.log("data", countriesToShow);
  }

  return (
    <div>
      <CountryFilter countryString={searchString}
      handleCountrySearch={handleCountrySearch}
      />
      <CountryData countryNames={countryNamesToShow} countries={countries}/>
    </div>
  )
}

export default App;