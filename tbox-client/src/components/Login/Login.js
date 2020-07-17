import React from 'react';

const Login = (props) => {
    return (
        <div>
            <p>I'm the login / signup comp</p>  
            <p onClick={props.dash}>go to dash</p>
        </div>
    );
};

export default Login;