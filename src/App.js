import React, { useState } from 'react';
const api = {
  key: "53c3e757f631ecb71b5417043ac83bc8",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") 
    ? ((weather.weather[0].main === "Thunderstorm") ? 'app Thunderstorm' 
     : (weather.weather[0].main === "Drizzle") ? 'app Drizzle' 
     : (weather.weather[0].main === "Rain") ? 'app Rain' 
     : (weather.weather[0].main === "Snow") ? 'app Snow' 
     : (weather.weather[0].main === "Clouds") ? 'app Clouds' 
     : (weather.weather[0].main === "Sunny") ? 'app Sunny' 
     : (weather.weather[0].main === "Mist") ? 'app Mist' 
     : (weather.weather[0].main === "Smoke") ? 'app Smoke' 
     : (weather.weather[0].main === "Haze") ? 'app Haze' 
     : (weather.weather[0].main === "Dust") ? 'app Dust' 
     : (weather.weather[0].main === "Fog") ? 'app Fog' 
     : (weather.weather[0].main === "Sand") ? 'app Sand' 
     : (weather.weather[0].main === "Clear") ? 'app Clear' 
     : (weather.weather[0].main === "Ash") ? 'app Ash' 
     : (weather.weather[0].main === "Squall") ? 'app Squall' 
     : (weather.weather[0].main === "Tornado") ? 'app Tornado' : 'app')
    
    : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search for a place...."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
    
  );
}

export default App;
