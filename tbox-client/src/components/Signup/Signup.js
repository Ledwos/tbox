import React from 'react';

const Signup = (props) => {
    return (
        <div>
            <p>I'm the signup comp
            </p>
            <p>Already have an account? <span onClick={props.toggleForm}>Click Here</span> to log in.</p>
        </div>
    );
};

export default Signup;