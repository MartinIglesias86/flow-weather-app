import React from 'react'
import { Card } from 'semantic-ui-react'

export function Forecast({forecast}) {
  let forecastList = forecast.slice(1, 6)

  return (
    <div className='forecast-container'>
      <Card.Group itemsPerRow={5}>
      {forecastList.map((data) => {
        return (
          <Card className='forecast-card' key={data.dt}>
            <Card.Content>
              <Card.Header className='forecast-date'>
                <b>Date</b>: {new Intl.DateTimeFormat('en-GB').format(data.dt * 1000)}
              </Card.Header>
              <Card.Header className='forecast-header'>
                <b>Temperature</b>: {Math.round((data.temp.max + data.temp.min)/2)}°C
              </Card.Header>
              <Card.Meta className='forecast-header humidity'>
                <b>Humidity</b>: {data.humidity}%
              </Card.Meta>
              <Card.Description className='temp-desc'>
                <b>Description</b>: {data.weather[0].description}
              </Card.Description>
            </Card.Content>
          </Card>
        )
      })}
      </Card.Group>
    </div>
  )
}
