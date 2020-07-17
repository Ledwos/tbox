import React, {useEffect, useState} from 'react';
import './Dash.css';

function Dash(props) {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        userLoc();
    }, []);
    
      // weather fetch
  const userLoc = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather);
      console.log('navigator geo location working in this browser')
    }
  };

  const getWeather = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(`coords: ${lat}, ${lon}`);
    fetch(`/api/weather/${lon}/${lat}`)
    .then(response => response.json())
    .then(data => {
        setWeather(data);
        console.log(weather);
    });
  };

    return (
        <div>
            <h2 id='dashGreet'>Good day [name]</h2>
            <div id='dashboard'>
                <div className='previewDiv'>
                    <div className='previewHead'>
                        <p>Weather</p>
                    </div>
                    <div className='previewBody'>
                        <img id='weatherImg' src={weather ? `http://openweathermap.org/img/w/${weather.weather[0].icon}.png` : null} alt='weather icon'></img>
                        <p id='weatherLoc'>{weather ? weather.main.temp : null} °C</p>
                        <p id='weatherTemp'>{weather ? weather.name : null}</p>
                    </div>
                </div>
                <div className='previewDiv' onClick={props.news}>
                    <div className='previewHead'>
                        <p>News</p>
                    </div>
                    <div className='previewBody'></div>
                </div>
                <div className='previewDiv' onClick={props.sport}>
                    <div className='previewHead'>
                        <p>Sport</p>
                    </div>
                    <div className='previewBody'></div>
                </div>
                <div className='previewDiv' onClick={props.photos}>
                    <div className='previewHead'>
                        <p>Photos</p>
                    </div>
                    <div className='previewBody'></div>
                </div>
                <div className='previewDiv' onClick={props.tasks}>
                    <div className='previewHead'>
                        <p>Tasks</p>
                    </div>
                    <div className='previewBody'></div>
                </div>
                <div className='previewDiv'>
                    <div className='previewHead'>
                        <p>Clothes</p>
                    </div>
                    <div className='previewBody'></div>
                </div>
            </div>
        </div>
    );
}

export default Dash;