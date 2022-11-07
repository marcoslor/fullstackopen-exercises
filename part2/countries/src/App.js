import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import CountryInfo from "./Components/CountryInfo";

const CountryResult = ({ country, searchResultsSetter }) => (
  <li>
    <button
      onClick={() => {
        searchResultsSetter([country]);
      }}
    >
      {country.name.common}
    </button>
  </li>
);

const CountrySearchResults = ({ countries, searchResultsSetter }) => (
  <ul>
    {countries.map((country) => (
      <CountryResult
        key={country.cca3}
        country={country}
        searchResultsSetter={searchResultsSetter}
      />
    ))}
  </ul>
);

function App() {
  const [countries, setCountries] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const countries = response.data;
      setCountries(countries);
    });
  }, []);

  const onSearch = (event) => {
    const searchResults = countries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setSearchResults(searchResults);
  };

  return (
    <>
      {(countries.length === 0 && <p>Loading...</p>) || (
        <div>
          <h1>Countries</h1>
          <input type="text" onInput={onSearch} />
          {(searchResults.length > 10 && (
            <p>Too many matches, specify another filter</p>
          )) ||
            (searchResults.length !== 1 && (
              <CountrySearchResults
                countries={searchResults}
                searchResultsSetter={setSearchResults}
              />
            )) || <CountryInfo country={searchResults[0]} />}
        </div>
      )}
    </>
  );
}

export default App;
