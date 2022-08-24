import React from 'react'
import { Card, Feed } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faCloud, faCloudRain, faSmog, faSnowflake, faSun, faTornado, faWind, } from '@fortawesome/free-solid-svg-icons'

const WeatherCard = ({ datos, city, icon }) => {
  const icons = {
    'Haze': faCloud,
    'Thunde': faBolt,
    'Drizzl': faCloudRain,
    'Rain': faCloudRain,
    'Snow': faSnowflake,
    'Mist': faSmog,
    'Clear':  faSun,
    'Clouds': faCloud,
    'Smoke': faSmog,
    'Dust': faSun,
    'Fog': faSmog,
    'Sand': faSun,
    'Ash': faSmog,
    'Squall': faWind,
    'Tornado': faTornado
}
  let weatherIcons = <FontAwesomeIcon icon={icons[icon]} size='lg' color='#212121'/>
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
              <h5 className='weather-card-child'>Date: {new Intl.DateTimeFormat('en-GB', { dateStyle: 'long'}).format(datos.dt * 1000)}</h5>
              <div className='weather-card'>
                <div className='weather-card-child'>
                  <b>Temperature</b>: {Math.round(datos.temp)}°C
                </div>
                <div className='weather-card-child'>
                  <b>Humidity</b>: {datos.humidity}%
                </div>
              </div>
              <div className='weather-card'>
                <div className='weather-card-child'>
                  <b>Sunrise</b>: {new Date(datos.sunrise * 1000).toLocaleTimeString()}
                </div>
                <div className='weather-card-child'>
                  <b>Sunset</b>: {new Date(datos.sunset * 1000).toLocaleTimeString()}
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

export  {WeatherCard}