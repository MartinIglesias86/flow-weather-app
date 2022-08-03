import React from 'react'
import Select from 'react-select'

// Options is an array of objects representing the cities in the dropdown menu 
const options = [
  { value: 'london', label: 'London', id: 'London, Uk', latitude: 51.5085, longitude: -0.1257 },
  { value: 'sidney', label: 'Sidney', id: 'Sidney, Au', latitude: -33.8688, longitude: 151.2093 },
  { value: 'new york', label: 'New York', id: 'New York, Us', latitude: 40.7128, longitude: -74.0060 },
  { value: 'oslo', label: 'Oslo', id: 'Oslo, No', latitude: 59.91273, longitude: 10.74609 },
  { value: 'moscow', label: 'Moscow', id: 'Moscow, Ru', latitude: 55.7558, longitude: 37.6173 },
]

// Dropdown component
function Dropdown({setLatitude, setLongitude, latitude, longitude}) {
  const [selectedOption, setSelectedOption] = React.useState(null)
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption)
    setLatitude(selectedOption.latitude);
    setLongitude(selectedOption.longitude);
  }
  return (
    <Select
      options={options}
      onChange={handleChange}
      value={selectedOption}
      className="dropdown-menu"
      placeholder={"Select a city"}
      id={'dropdown'}
      selectedOption={selectedOption}
    />
  )
}

export { Dropdown }