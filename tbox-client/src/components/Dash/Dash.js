import React from 'react';

function Dash(props) {
    return (
        <div>
            <p>I'm the dashboard</p>
            <p>Weather</p>
            <p onClick={props.news}>News</p>
            <p onClick={props.sport}>Sport</p>
            <p onClick={props.photos}>Photos</p>
            <p onClick={props.tasks}>Tasks</p>
            <p>Clothes</p>
        </div>
    );
}

export default Dash;