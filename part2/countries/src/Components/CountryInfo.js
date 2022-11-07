import { useState, useEffect } from "react";
import axios from "axios";

function CountryInfo({ country }) {
  const [weather, setWeather] = useState();

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;

    const lat = country.capitalInfo.latlng[0];
    const lon = country.capitalInfo.latlng[1];

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [country]);

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>
        <h2>Country info</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
      {(weather && (
        <div>
          <h2>Weather in {country.capital}</h2>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}ºC</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt=""
          />
          <p>
            Wind: {weather.wind.speed} m/s {weather.wind.deg}º{" "}
          </p>
        </div>
      )) || <p>Loading weather...</p>}
    </>
  );
}

export default CountryInfo;
