import React, {useEffect, useState} from 'react';
import './Dash.css';
import fetch from 'node-fetch';

function Dash(props) {
    const [weather, setWeather] = useState(null);
    const [newsfeed, setNewsfeed] = useState(null);

    useEffect(() => {
        userLoc();
        getNews();
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
    // console.log(`coords: ${lat}, ${lon}`);
    fetch(`/api/weather/${lon}/${lat}`)
    .then(response => response.json())
    .then(data => {
        setWeather(data);
    });
  };

    // news fetch
    const getNews = () => {
        fetch('/api/news')
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            let first = data.querySelector('item');
            setNewsfeed(first);
            console.log(first);
        })
    };

    const newslink = () => {
        let url = newsfeed.querySelector('link').innerHTML;
        let url_key  = url.search("news") + 5;
        url = url.slice(url_key)
        // console.log(url);
        props.newsurl(url);
    }

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
                <div className='previewDiv' onClick={newslink}>
                    <div className='previewHead'>
                        <p>News</p>
                    </div>
                    <div className='previewBody'>
                        <h4 id='newsHeading'>{newsfeed ? newsfeed.querySelector('title').innerHTML.trim().replace(/^(\/\/\s*)?<!\[CDATA\[|(\/\/\s*)?\]\]>$/g, '') : null}</h4>
                        <p id='newsDesc'>{newsfeed ? newsfeed.querySelector('description').innerHTML.trim().replace(/^(\/\/\s*)?<!\[CDATA\[|(\/\/\s*)?\]\]>$/g, '') : null}</p>
                    </div>
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