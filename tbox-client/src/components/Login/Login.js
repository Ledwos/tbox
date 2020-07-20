import React from 'react';

const Login = (props) => {
    return (
        <div>
            <p>I'm the login / signup comp</p>  
            <p onClick={props.dash}>go to dash</p>
            <form  onSubmit={props.handleLogin} method='POST' id='loginForm'>
                <input 
                    type='text' 
                    id='u_email' 
                    placeholder='someone@organised.com'
                    pattern="[a-zA-Z0-9!#$%&amp;'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*"
                    required
                    ></input>
                <input 
                    type='password' 
                    id='u_pass'
                    placeholder='password'
                    required
                    ></input>
                {props.errTxt ? <p className='errTxt'>Please check your login details</p> : null}
                <button type='submit' id='loginBtn'>Log in</button>
            </form>
            <p>New to the challenge? <span onClick={props.toggleForm}>Sign up</span></p>
        </div>
    );
};

export default Login;