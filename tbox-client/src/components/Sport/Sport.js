import React, { useState, useEffect } from 'react';
import './Sport.css';

const Sport = (props) => {
    const [futbol, setfutbol] = useState([]);
    
    useEffect(() => {
        props.getSportData('Milan');
    }, []);

    useEffect(() => {
        setfutbol(props.futbol);
    }, [props.futbol])

    // update futbol 
    const handleChange = (e) => {
        let value = document.querySelector('#teamInput').value;
        props.getSportData(value);
        // console.log(value);
    };

    return (
        <div id='sportComp'>
           <h1 id='pageTitle' onClick={props.dashPage} >Sport</h1>
           <div id='teamInputDiv'>
                <input type='text' placeholder='Input team name' onChange={handleChange} id='teamInput'></input> 
                <div id='inputLine'></div>
           </div>
           <div id='sportOutput'>
            {futbol.length > 0 ? [
                futbol.map(game => (
                    <div className='matchDiv'>
                        <p>{game.team}</p>
                        <p>{game.score}</p>
                    </div>
                ))
            ] : null} 
           </div>
        </div>
    );
};

export default Sport;