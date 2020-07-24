import React from 'react';
import './Login.css';

const Login = (props) => {
    return (
        <div id='loginComp' >
            <div id='loginDiv'>
                <h1 id='loginTitle' >Hackathon</h1>
                <form  onSubmit={props.handleLogin} method='POST' id='loginForm'>
                    <div id='loginTextInput'>
                        <input 
                            type='text' 
                            id='u_email' 
                            placeholder='Username'
                            pattern="[a-zA-Z0-9!#$%&amp;'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*"
                            required
                            ></input>
                        <input 
                            type='password' 
                            id='u_pass'
                            placeholder='Password'
                            required
                            ></input>
                    </div>
                    {props.errTxt ? <p className='errTxt'>Please check your login details</p> : null}
                    <button type='submit' id='loginBtn'>Login</button>
                </form>
            </div>
            <p id='signupText' >New to the challenge? <span onClick={props.toggleForm}>Sign up</span></p>
        </div>
    );
};

export default Login;