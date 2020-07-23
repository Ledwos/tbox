import React, {useEffect, useState} from 'react';
import './Dash.css';
import fetch from 'node-fetch';

function Dash(props) {
    const [weather, setWeather] = useState(null);
    const [newsfeed, setNewsfeed] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [sports, setSports] = useState([]);
    const [pieData, setpieData] = useState([]);
    const [photos, setPhoto] = useState([]);

    useEffect(() => {
        userLoc();
        props.getNews();
        getClothes();
        props.getSportData('Milan');
    }, []);

    useEffect(() => {
        getTasks();
        getPhotos();
    }, [props.uid]);

    useEffect(() => {
        sportHeadline();
    }, [props.futbol]);

    useEffect(() => {
        makePie();
    }, [pieData]);

    const sportHeadline = () => {
        let limit = props.futbol.length
        let match = Math.floor(Math.random() * limit);
        setSports(props.futbol[match]);
    };
    
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
    fetch(`/api/weather/${lon}/${lat}`)
    .then(response => response.json())
    .then(data => {
        setWeather(data);
    });
  };

    // task fetch
    const getTasks = () => {
        fetch(`db/tasks/${props.uid}`)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                data = data.sort((a, b) => parseFloat(a.t_id) - parseFloat(b.t_id));
                let top3 = data.filter(item => item.t_id < 4);
                setTasks(top3);
            }
        });
    };

    // photo fetch
    const getPhotos = () => {
        fetch(`/db/photos/fetch/${props.uid}`)
        .then(response => response.json())
        .then(info => {
            let newset = info.slice(0,4);
            setPhoto(newset)
        });
    };

    // clothes fetch
    const getClothes = () => {
        fetch('/api/clothes')
        .then(response => response.json())
        .then(info => setpieData(info));
    };

    // build piechart
    const makePie = () => {
        let itemCount = Object.values(pieData);
        const reducer = (a, b) => a + b;
        let total = itemCount.reduce(reducer, 0);

        // prep data for plot - generate angles
        let itemAngles = itemCount.map(x => (2 * Math.PI * x) / total);
        // colours for chart
        const col = ['#25b04c', '#b03525', '#c9a308', '#3642c7', '#b82abf', '#15bbd1'];
        // draw chart
        let startAngle = 0;
        let endAngle = 0;
        let canvas = document.getElementById('pie');
        let ctx = canvas.getContext('2d');
        for(let x = 0; x < itemAngles.length; x++) {
            startAngle = endAngle;
            endAngle = endAngle + itemAngles[x];
            ctx.beginPath();
            ctx.fillStyle = col[x];
            ctx.moveTo(110, 80);
            ctx.arc(110, 80, 70, startAngle, endAngle);
            ctx.lineTo(110, 80);
            ctx.stroke();
            ctx.fill();
        };
        pieInfo();
    };

    // make piechart key
    const pieInfo = () => {
        let items = Object.keys(pieData);
        const col = ['#25b04c', '#b03525', '#c9a308', '#3642c7', '#b82abf', '#15bbd1'];
        let itemList = document.createElement('ul');
        for (let x = 0; x < items.length; x++){
            let itemName = document.createElement('li');
            itemName.style.color = col[x];
            itemName.innerHTML = items[x];
            itemList.innerHTML += itemName.outerHTML;
        };
        document.getElementById('pKey').appendChild(itemList);
    };




    return (
        <div id='dashMain'>
            <div id='dashHead'>
                <h2 id='dashGreet'>Good day {props.uname}</h2>
                <button onClick={props.logout} id='logoutBtn'>Log out</button><br/>
            </div>
            <div id='dashboard'>
                <div className='previewDiv'>
                    <div className='previewHead'>
                        <p>Weather</p>
                    </div>
                    <div className='previewBody'>
                        <table id='wTable'>
                            <tbody>
                                <tr>
                                    <td class='wR1'>
                                        <img id='wImg' src={weather ? `http://openweathermap.org/img/w/${weather.weather[0].icon}.png` : null} alt='weather icon'></img>
                                    </td>
                                    <td class='wR1'>
                                        <p id='weatherLoc'>{weather ? weather.main.temp : null} °C</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td id='wR2' colSpan='2'>
                                        {weather ? weather.name : null}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='previewDiv' onClick={props.news}>
                    <div className='previewHead'>
                        <p>News</p>
                    </div>
                    <div className='previewBody'>
                        <h4 id='newsHeading'>{props.newsfeed ? props.newsfeed.querySelector('title').innerHTML.trim().replace(/^(\/\/\s*)?<!\[CDATA\[|(\/\/\s*)?\]\]>$/g, '') : null}</h4>
                        <p id='newsDesc'>{props.newsfeed ? props.newsfeed.querySelector('description').innerHTML.trim().replace(/^(\/\/\s*)?<!\[CDATA\[|(\/\/\s*)?\]\]>$/g, '') : null}</p>
                    </div>
                </div>
                <div className='previewDiv' onClick={props.sport}>
                    <div className='previewHead'>
                        <p>Sport</p>
                    </div>
                    <div className='previewBody'>
                        {sports ? [
                            <p id='sportBody'>Wow! Milan beat {sports.team} {sports.score}!</p>
                        ] : null}
                        <p>(click for more stats!)</p>
                    </div>
                </div>
                <div className='previewDiv' onClick={props.photos}>
                    <div className='previewHead'>
                        <p>Photos</p>
                    </div>
                    <div className='previewBody'>
                        <div id='photoMain'>
                            {photos.length > 0 ? [
                            photos.map(photo => (
                                <div key={photo.p_id} id={photo.p_id} className='photoBox' >
                                <img src={`${photo.p_img}`} alt='photo' className='photoPreview' />
                                </div>
                            ))
                        ] : <p>No photos found</p>}
                        </div>
                    </div>
                </div>
                <div className='previewDiv' onClick={props.tasks}>
                    <div className='previewHead'>
                        <p>Tasks</p>
                    </div>
                    <div className='previewBody' id='taskMain'>
                        {tasks.length > 0 ? [
                        tasks.map(task => (
                        <div key={task.t_id} className='taskDiv'>
                            <div className='taskHeader' key={task.t_id}>
                                <p className='taskTitle'>{task.t_name}</p>
                                <div className='taskLine'></div>
                            </div>
                                <label className='checkLabel'>
                                    <input type='checkbox' defaultChecked={task.t_comp} class='taskCheckbox'></input>
                                    <span class='checkMark'></span>
                                </label>
                        </div>
                        ))] : <p>No tasks set</p>
                        }
                    </div>
                </div>
                <div className='previewDiv'>
                    <div className='previewHead'>
                        <p>Clothes</p>
                    </div>
                    <div className='previewBody' id='pieMain'>
                        <canvas id='pie'></canvas>
                        <div id='pKey'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dash;