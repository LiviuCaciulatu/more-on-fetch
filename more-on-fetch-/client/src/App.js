import './App.css';
import React, { useState, useEffect } from 'react';
import Countries from './Components/Countries.js';
import CountryData from "./Components/CountryData.js";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedCountries, setSortedCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v2/all')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error(error));
  }, []);

  
  useEffect(() => {
    const sorted = [...filteredCountries].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setSortedCountries(sorted);
  }, [countries, sortOrder]);
  
  const filteredCountries = countries.filter(country=>{
    return country.name.toLowerCase().includes(searchInput.toLowerCase())
  })
  console.log(countries)

  function handleCountryClick(country){
    setSelectedCountry(country)
  }

  function handleBackClick(){
    setSelectedCountry(null);
  }

  function handleSortClick() {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
  }

  function handleSearch(e){
    setSearchInput(e.target.value)
    const filtered = countries.filter(country=>{
      return country.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setSortedCountries(filtered)
  }


  function handlePlusClick(e){
    setFavorites(country)
  }



  return (
    <div>
      
      {selectedCountry ? null:<><button onClick={handleSortClick}>{`Sort by name (${sortOrder})`}</button>
      <input type="text" placeholder='Search Country' value={searchInput} onChange={handleSearch}></input></>}
      {selectedCountry ? (
        <CountryData country={selectedCountry} onBackClick={handleBackClick} />
      ) : (
        <Countries countries={sortedCountries} onCountryClick={handleCountryClick} />
      )}
    </div>
  );
}

export default App;
