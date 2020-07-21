import React, { useState, useEffect } from 'react';

const Sport = (props) => {
    const [futbol, setfutbol] = useState([]);
    
    useEffect(() => {
        props.getSportData('Milan');
    }, []);

    useEffect(() => {
        setfutbol(props.futbol);
    }, [props.futbol])

    // // get data
    // const getData = (teamName) => {
    //     // let team = teamName
    //     fetch(`api/sports/${teamName}`)
    //     .then(response => {
    //         if (response.status === 200) {
    //             response.json()
    //             .then(data => props.setFutbol(data));
    //         } else if (response.status === 404) {
    //             console.log('no team with that name');
    //         };
    //     });
    // };

    // update futbol 
    const handleChange = (e) => {
        let value = document.querySelector('#teamInput').value;
        props.getSportData(value);
        console.log(value);
    };

    return (
        <div>
           <p>I'm the sport comp</p>
           <input type='text' placeholder='Enter team e.g. Milan' onChange={handleChange} id='teamInput'></input> 
           {futbol.length > 0 ? [
               futbol.map(game => (
                   <div className='matchDiv'>
                       <p>{game.team}</p>
                       <p>{game.score}</p>
                   </div>
               ))
           ] : null} 
        </div>
    );
};

export default Sport;