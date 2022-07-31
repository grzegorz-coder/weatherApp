import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8c00620e7f56112563f6fe604f9dcc46`
   
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
        axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
     setLatitude('') 
     setLongitude('')
    }
  }

  return (
    <div className='app' >
      <div className='search'>
        <input 
        value={latitude}
        onChange={event => setLatitude(event.target.value)}
        placeholder='Enter latitude'
        onKeyPress={searchLocation}
        type='text'/>
        <br></br>
        <br></br>
        <input 
        value={longitude}
        onChange={event => setLongitude(event.target.value)}
        placeholder='Enter longitude'
        onKeyPress={searchLocation}
        type='text'/>
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>
            {data.name}
            </p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{Math.ceil(data.main.temp.toFixed()-273.15)}°C</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p>: null}
          </div>
        </div>
        {data.name != undefined &&
        <div className='bottom'>
          <div className='feels'>
            <p className='bold'></p>
            {data.main ? <p className='bold'>{Math.ceil(data.main.feels_like.toFixed()-273.15)}°C</p> : null}
          <p>Feels like</p>
          </div>
          <div className='humidity'>
          {data.main ? <p className='bold'>{Math.ceil(data.main.humidity.toFixed())}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
            {data.main ? <p className='bold'>{Math.ceil(data.wind.speed)}m/s</p> : null} 
            <p>Wind Speed</p>
          </div>
        </div> 
        }
      </div>
    </div>
  );
}
export default App;