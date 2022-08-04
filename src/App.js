import { useEffect, useState } from 'react';
import React, { Component }  from 'react';
import axios from 'axios';
import './App.css';
import { Header } from './components/Header';
import WeatherCard from './components/WeatherCard';
import { Forecast } from './components/Forecast';
import { Dropdown } from './components/Dropdown';
import { Loader } from 'semantic-ui-react';
import env from "react-dotenv";

// Configure environment variables
const URL = env.REACT_APP_API_URL;
const API_KEY = env.REACT_APP_API_KEY

// Main App component
function App() {
  // State variables
  // [-34.6132, -58.3772]
  const [latitude, setLatitude] = useState('-34.6132');
  const [longitude, setLongitude] = useState('-58.3772');
  const [city, setCity] = useState('Current Location');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [date, setDate] = useState('');
  const [icon, setIcon] = useState('');
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get location
  useEffect(() => {
    // Get current location if no city is selected in the dropdown
    if ((latitude === '-34.6132' ) && (longitude === '-58.3772')) {
      navigator.geolocation.getCurrentPosition(position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      })
    }
    // Get weather data for selected city
    axios.get(`${URL}/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`)
      .then(weatherData => {
        let cityName = weatherData.data.timezone || 'Current Location';
        cityName = cityName.split('/')[1] || cityName;
        cityName = cityName.replace('_', ' ');
        setCity( cityName === 'Argentina' ? `${weatherData.data.timezone.split('/')[2].replace('_', ' ')}` : `${cityName}`);
        setLoading(false);
        setTemperature(weatherData.data.current.temp ? weatherData.data.current.temp : 'no data');
        setHumidity(weatherData.data.current.humidity ? weatherData.data.current.humidity : 'no data');
        setSunrise(weatherData.data.current.sunrise ? weatherData.data.current.sunrise : 'no data');
        setSunset(weatherData.data.current.sunset ? weatherData.data.current.sunset : 'no data');
        setDate(weatherData.data.current.dt ? weatherData.data.current.dt : 'no data');
        setIcon(weatherData.data.current.weather[0].main ? weatherData.data.current.weather[0].main : 'no data');
        setForecast(weatherData.data.daily ? weatherData.data.daily : []);
      })
      .catch(err => {
        console.log('Error: ', err);
      })
    }, [latitude, longitude]);
  return (
    <div className="main">
      <Header />
      <Dropdown
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        latitude={latitude}
        longitude={longitude}
      />
      { loading ? (
        <div>
          <p>Loading... please wait</p>
          <Loader active inline='centered' />
        </div>
      ) : (
        <WeatherCard 
          temperature={temperature} 
          city={city} 
          humidity={humidity} 
          sunrise={sunrise} 
          sunset={sunset} 
          date={date}
          icon={icon}
        />
      ) }
      
      <Forecast forecast={forecast}/>
    </div>
  );
}

export default App;
