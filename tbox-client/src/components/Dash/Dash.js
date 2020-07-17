import React, {useEffect} from 'react';
import './Dash.css';

function Dash(props) {
    

    return (
        <div>
            <h2 id='dashGreet'>Good day [name]</h2>
            <div id='dashboard'>
                <div className='previewDiv'>
                    <div className='previewHead'>
                        <p>Weather</p>
                    </div>
                    <div className='previewBody'></div>
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