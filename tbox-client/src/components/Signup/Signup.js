import React, { useState } from 'react';
import fetch from 'node-fetch';

const Signup = (props) => {
    const [emErr, setemErr] = useState(false);
    const [passErr, setpassErr] = useState(false);


    const toggleemErr = () => {
        setemErr(!emErr);
    };
    const togglepassErr = () => {
        setpassErr(!passErr);
    };

    const handleSignup = (e) => {
        e.preventDefault();
        const name = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const pass = document.getElementById('pass').value;
        const pass2 = document.getElementById('pass2').value;
        if (pass !== pass2) {
            togglepassErr();
        } else {
            // console.log('your passwords match :)')
            fetch('/db/signup', {
                mode: 'cors',
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": name,
                    "pass": pass,
                    "email": email
                })
            })
            .then(response => {
                if (response.status === 409) {
                    toggleemErr();
                } else if (response.status === 200) {
                    document.querySelector('#signupForm').reset();
                    props.toggleForm();
                } else {
                    console.log(`error: ${response.status}`)
                }
            });
        };
    };



    return (
        <div>
             <form id='signupForm' onSubmit={handleSignup} method='POST'>
                <input type='text' id='username'  placeholder='First Name' required></input>
                <input type='text' 
                        id='email'
                        placeholder='Email'
                        pattern="[a-zA-Z0-9!#$%&amp;'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*"
                        required></input>
                {emErr ? <p>email already exists</p> : null}
                <input type='password' 
                       id='pass'
                       placeholder='Password' 
                       required ></input>
                <input type='password' 
                       id='pass2' 
                       placeholder='Confirm Password' 
                       required ></input>
                {passErr ? <p>Passwords must match</p> : null}
                <button type='submit' id='signupBtn'>Sign Up</button>
            </form>
            <p>Already have an account? <span onClick={props.toggleForm}>Click Here</span> to log in.</p>
        </div>
    );
};

export default Signup;