import React from 'react'
import { Card, Feed } from 'semantic-ui-react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faCloud, faCloudRain, faSmog, faSnowflake, faSun, faTornado, faWind, } from '@fortawesome/free-solid-svg-icons'

const WeatherCard = ({ temperature, city, humidity, sunrise, sunset, icon }) => {
  switch (icon) {
    case 'Haze':
      icon = faCloud
      break;
    case 'Thunderstorm' :
      icon = faBolt
      break;
    case 'Drizzle':
      icon = faCloudRain
      break;
    case 'Rain':
      icon = faCloudRain
      break;
    case 'Snow':
      icon = faSnowflake
      break;
    case 'Mist':
      icon = faSmog
      break;
    case 'Clear':
      icon = faSun
      break;
    case 'Clouds':
      icon = faCloud
      break;
    case 'Smoke':
      icon = faSmog
      break;
    case 'Dust':
      icon = faSun
      break;
    case 'Fog':
      icon = faSmog
      break;
    case 'Sand':
      icon = faSun
      break;
    case 'Ash':
      icon = faSmog
      break;
    case 'Squall':
      icon = faWind
      break;
    case 'Tornado':
      icon = faTornado
      break;
    default:
      icon = faSun
      break;
  }
  let weatherIcons = <FontAwesomeIcon icon={icon} size='lg' color='#212121'/>
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
                  <b>Temperature</b>: {Math.round(temperature)}°C
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