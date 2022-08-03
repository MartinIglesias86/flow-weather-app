import { useEffect, useState } from 'react';
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
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [date, setDate] = useState(null);
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
        let cityName = weatherData.data.timezone.split('/')[1].replace('_', ' ');
        setCity( cityName === 'Argentina' ? `${weatherData.data.timezone.split('/')[2].replace('_', ' ')}` : `${cityName}`);
        setLoading(false);
        setTemperature(weatherData.data.current.temp);
        setHumidity(weatherData.data.current.humidity);
        setSunrise(weatherData.data.current.sunrise);
        setSunset(weatherData.data.current.sunset);
        setDate(weatherData.data.current.dt);
        setIcon(weatherData.data.current.weather[0].main);
        setForecast(weatherData.data.daily);
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
