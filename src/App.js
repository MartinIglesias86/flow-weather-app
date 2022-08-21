import { useEffect, useState } from 'react';
import React  from 'react';
import axios from 'axios';
import './App.css';
import { Header } from './components/Header';
import WeatherCard from './components/WeatherCard';
import { Forecast } from './components/Forecast';
import { Dropdown } from './components/Dropdown';
import { Loader } from 'semantic-ui-react';
import env from "react-dotenv";
import { Footer } from './components/Footer';

const URL = env.REACT_APP_API_URL;
const API_KEY = env.REACT_APP_API_KEY

function App() {
  const [latitude, setLatitude] = useState('-34.6132');
  const [longitude, setLongitude] = useState('-58.3772');
  const [city, setCity] = useState('Current Location');
  const [datos, setDatos] = useState({});
  const [icon, setIcon] = useState('');
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ((latitude === '-34.6132' ) && (longitude === '-58.3772')) {
      navigator.geolocation.getCurrentPosition(position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      })
    }
    axios.get(`${URL}/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`)
      .then(weatherData => {
        let cityName = weatherData.data.timezone || 'Current Location';
        cityName = cityName.split('/')[1] || cityName;
        cityName = cityName.replace('_', ' ');
        setCity( cityName === 'Argentina' ? `${weatherData.data.timezone.split('/')[2].replace('_', ' ')}` : `${cityName}`);
        setLoading(false);
        setDatos(weatherData.data.current);
        setIcon(weatherData.data.current.weather[0].main ? weatherData.data.current.weather[0].main : 'no data');
        setForecast(weatherData.data.daily ? weatherData.data.daily : []);
      })
      .catch(err => {
        console.log('Error: ', err);
      })
    }, [latitude, longitude]);
  return (
    <main className="main">
      <Header />
      <section>
        <Dropdown
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          latitude={latitude}
          longitude={longitude}
        />
      </section>
      { loading ? (
        <section>
          <p>Loading... please wait</p>
          <Loader active inline='centered' />
        </section>
      ) : (
          <WeatherCard 
          temperature={datos.temp} 
          city={city} 
          humidity={datos.humidity} 
          sunrise={datos.sunrise} 
          sunset={datos.sunset} 
          date={datos.dt}
          icon={icon}
          />
      ) }
      <section>
        <Forecast forecast={forecast}/>
      </section>
      <Footer />
    </main>
  );
}

export default App;
