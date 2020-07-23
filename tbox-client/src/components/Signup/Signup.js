import React, { useState } from 'react';
import fetch from 'node-fetch';

const Signup = (props) => {
    const [emErr, setemErr] = useState(false);
    const [passErr, setpassErr] = useState(false);
    const [imgString, setimgString] = useState('');


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
                    return response.json()
                    .then(userInfo => {
                        postPhoto(imgString, userInfo.newUser);
                    })
                } else {
                    console.log(`error: ${response.status}`)
                }
            });
        };
    };

    const prepFile = () => {
        let file = document.getElementById('signupImg').files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            let img = new Image();
            img.src = e.target.result;
            img.onload = (ev) => {
                let canvas = document.createElement('canvas');
                canvas.width = 280;
                canvas.height = 280;
                let ctx = canvas.getContext('2d');
                // rescale photo while retaining aspect ratio
                if (img.width > img.height || img.width == img.height) {
                    let ratio = img.width / 280;
                    let newWidth = 280;
                    let newHeight = img.height / ratio
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);
                } else if (img.width < img.height) {
                    let ratio = img.height / 280;
                    let newWidth = img.width / ratio;
                    let newHeight = 280;
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);
                };
                // convert image to base64
                let data = canvas.toDataURL()
                setimgString(data);
            };
        };
    };

    // post to db
    const postPhoto = (istr, user) => {
        let img = istr;
        let uid = user;
        if (img.length > 0) {
            fetch('/db/photos/upload', {
                mode: 'cors',
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "uid": uid,
                    "img": img
                })
            })
            .then(response => {
                if (response.status === 200) {
                    document.querySelector('#signupForm').reset();
                    props.toggleForm();
                } else {
                    console.log(`error: ${response.status}`)
                };
            });
        } else {
            console.log('nothing to upload');
        }
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
            <label htmlFor='signupImg'>Add a photo</label>
            <input type='file' id='signupImg' onChange={prepFile}></input>
            <p>Already have an account? <span onClick={props.toggleForm}>Click Here</span> to log in.</p>
        </div>
    );
};

export default Signup;