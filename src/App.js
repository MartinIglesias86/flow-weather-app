import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Header } from './components/Header';
import { WeatherCard } from './components/WeatherCard';
import { Forecast } from './components/Forecast';
import { Dropdown } from './components/Dropdown';
import { Loader } from 'semantic-ui-react';
import { Footer } from './components/Footer';
import Swal from 'sweetalert2';

const URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [city, setCity] = useState('Current Location');
  const [datos, setDatos] = useState({});
  const [icon, setIcon] = useState('');
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ((latitude === '' ) && (longitude === '')) {
      navigator.geolocation.getCurrentPosition(position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      }, () => {
        Swal.fire({
          title: 'Attention',
          text: 'Please allow location services to use this app or select a city from the dropdown menu',
          icon: 'warning',
          confirmButtonText: 'Ok'
        })
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
        setIcon(weatherData.data.current.weather[0].main ? weatherData.data.current.weather[0].main : 'Clear');
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
        />
      </section>
      { loading ? (
        <section>
          <p>Please choose a city</p>
          <Loader active inline='centered' />
        </section>
      ) : (
          <WeatherCard 
          datos={datos}
          city={city} 
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
