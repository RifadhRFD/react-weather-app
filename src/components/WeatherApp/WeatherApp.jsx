import React, { useState } from 'react';
import './WeatherApp.css';
import wind_icon from '../Assets/wind.png';
import snow_icon from '../Assets/snow.png';
import search_icon from '../Assets/search.png';
import rain_icon from '../Assets/rain.png';
import humidity_icon from '../Assets/humidity.png';
import drizzle_icon from '../Assets/drizzle.png';
import cloud_icon from '../Assets/cloud.png';
import clear_icon from '../Assets/clear.png';


const WeatherApp = () => {
  let API_KEY = process.env.REACT_APP_API_KEY;


  const [wicon, setWicon] = useState(cloud_icon)

  const search = async () => {
    const element = document.getElementsByClassName('cityInput');
    if (!element || element.value === '') {
      return 0;
    }

    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${API_KEY}`;

      let response = await fetch(url);
      let data = await response.json();

      const humidity = document.getElementsByClassName('humidity-percent');
      const wind = document.getElementsByClassName('wind-rate');
      const temperature = document.getElementsByClassName('weather-temp');
      const location = document.getElementsByClassName('weather-location');

      // Convert Kelvin to Celsius
    const temperatureCelsius = data.main.temp - 273.15;

      humidity[0].innerHTML = data.main.humidity;
      wind[0].innerHTML = data.wind.speed;
      temperature[0].innerHTML = `${temperatureCelsius.toFixed(2)}°C`;
      location[0].innerHTML = data.name;

      if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
        setWicon(clear_icon);
      }
      else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
        setWicon(cloud_icon);
      }
      else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
        setWicon(drizzle_icon);
      }
      else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
        setWicon(drizzle_icon);
      }
      else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
        setWicon(rain_icon);
      }
      else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
        setWicon(rain_icon);
      }
      else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
        setWicon(snow_icon);
      }
      else{
        setWicon(clear_icon);
      }


    } catch (error) {
      console.error('Please check the spelling or Enter a correct city name', error);
    const errormsg = document.getElementsByClassName('error-msg');
    errormsg[0].innerHTML = "Please check the spelling or Enter a correct city name";
    setTimeout(() => {
        errormsg[0].innerHTML = '';
      }, 4000);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search City" />
        <div className="search-icon">
          <img
            src={search_icon}
            alt="search icon"
            onClick={() => {
              search();
            }}
          />
        </div>
      </div>
      <p className="error-msg"></p>
      <div className="weather-image">
        <img src={wicon} alt="cloud icon" />
      </div>
      <div className="weather-temp">00°C</div>
      <div className="weather-location">City</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" />
          <div className="data">
            <div className="humidity-percent">00%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" />
          <div className="data">
            <div className="wind-rate">00 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
