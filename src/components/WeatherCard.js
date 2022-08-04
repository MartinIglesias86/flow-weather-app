import React from 'react'
import { Card, Feed } from 'semantic-ui-react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faCloud, faCloudRain, faSmog, faSnowflake, faSun, faTornado, faWind, } from '@fortawesome/free-solid-svg-icons'

// WeatherCard component
const WeatherCard = ({ temperature, city, humidity, sunrise, sunset, date, icon }) => {
  // Initialize icon as null
  let weatherIcons = null
  // Switch icon based on weather condition
  switch (icon) {
    case 'Haze':
      weatherIcons = <FontAwesomeIcon icon={faCloud} />
      break;
    case 'Thunderstorm' :
      weatherIcons = <FontAwesomeIcon icon={faBolt} size='lg' color='#212121'/>
      break;
    case 'Drizzle':
      weatherIcons = <FontAwesomeIcon icon={faCloudRain} size='lg' color='#212121'/>
      break;
    case 'Rain':
      weatherIcons = <FontAwesomeIcon icon={faCloudRain} size='lg' color='#212121'/>
      break;
    case 'Snow':
      weatherIcons = <FontAwesomeIcon icon={faSnowflake} size='lg' color='#212121'/>
      break;
    case 'Mist':
      weatherIcons = <FontAwesomeIcon icon={faSmog} size='lg' color='#212121'/>
      break;
    case 'Clear':
      weatherIcons = <FontAwesomeIcon icon={faSun} size='lg' color='#212121'/>
      break;
    case 'Clouds':
      weatherIcons = <FontAwesomeIcon icon={faCloud} size='lg' color='#212121'/>
      break;
    case 'Smoke':
      weatherIcons = <FontAwesomeIcon icon={faSmog} size='lg' color='#212121'/>
      break;
    case 'Dust':
      weatherIcons = <FontAwesomeIcon icon={faSun} size='lg' color='#212121'/>
      break;
    case 'Fog':
      weatherIcons = <FontAwesomeIcon icon={faSmog} size='lg' color='#212121'/>
      break;
    case 'Sand':
      weatherIcons = <FontAwesomeIcon icon={faSun} size='lg' color='#212121'/>
      break;
    case 'Ash':
      weatherIcons = <FontAwesomeIcon icon={faSmog} size='lg' color='#212121'/>
      break;
    case 'Squall':
      weatherIcons = <FontAwesomeIcon icon={faWind} size='lg' color='#212121'/>
      break;
    case 'Tornado':
      weatherIcons = <FontAwesomeIcon icon={faTornado} size='lg' color='#212121'/>
      break;
    default:
      weatherIcons = <FontAwesomeIcon icon={faSun} size='lg' color='#212121'/>
      break;
  }
  return (
    <Card className='weather-card-main'>
      <Card.Content className='weather-card'>
        <Card.Header className='weather-card-child'>{city ? city : 'Current Location'}</Card.Header>
        <div className='icon-container'>{weatherIcons}</div>
      </Card.Content>
      <Card.Content>
        <Feed>
          <Feed.Event>
            <Feed.Content>
              <h5 className='weather-card-child'>{moment().format('LL')}</h5>
              <div className='weather-card'>
                <div className='weather-card-child'>
                  <b>Temperature</b>: {temperature}°C
                </div>
                <div className='weather-card-child'>
                  <b>Humidity</b>: {humidity}%
                </div>
              </div>
              <div className='weather-card'>
                <div className='weather-card-child'>
                  <b>Sunrise</b>: {new Date(sunrise * 1000).toLocaleTimeString()}
                </div>
                <div className='weather-card-child'>
                  <b>Sunset</b>: {new Date(sunset * 1000).toLocaleTimeString()}
                </div>
              </div>
              <div className='info-box'>The times shown are expressed in your local timezone</div>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Card.Content>
    </Card>
  )
}

export default WeatherCard