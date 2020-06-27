import React, {useState, useEffect} from 'react';

const CountryFilter = ({countryString, handleCountrySearch, numMatches}) => {
  return (
    <form>
      <div>
        find countries <input value={countryString} onChange={handleCountrySearch}/>
      </div>
    </form>
  )
}

const CountryData = ({countries}) => {
  if (countries.length === 1) {
    return (
      <p>match found: {countries[0]}</p>
    )
  } else if (countries.length <= 10) {
    return (
      countries.map(country => <p key={country}>{country}</p>)
    )
  } else if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  return (
    <div>
      <p>please enter a search</p>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([
    'Botswana',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Canada',
    'Singapore',
    'Japan',
    'France',
    'Spain',
    'Brazil',
    'Greece',
    'America',
    'Mexico',
    'Finland',
    'Argentina',
    'India',
    'Vietnam',
    'Italy',
    'Portugal',
    'Egypt',
    'Saudi Arabia',
    'Israel',
    'Madegascar',
  ])
  const [searchString, setSearchString] = useState('')
  // don't care about which of 4 states to be in for display
  // all you need to care about is the length of countries
  // after filtering

  // only filter when there's something in the form
  const [filterCountries, setFilterCountries] = useState(false)
  const countriesToShow = filterCountries
    ? countries.filter(country => country.toLowerCase().includes(searchString))
    : countries
  console.log("data", countriesToShow);
  const handleCountrySearch = (event) => {
    // console.log(event.target.value);
    
    setSearchString(event.target.value) 
    searchString.length === 0 ? setFilterCountries(false) : setFilterCountries(true)
    
    // setCountries(countriesToShow)
    // console.log("data", countriesToShow);
  }

  return (
    <div>
      <CountryFilter countryString={searchString} handleCountrySearch={handleCountrySearch}/>
      <CountryData countries={countriesToShow}/>
    </div>
  )
}

export default App;
