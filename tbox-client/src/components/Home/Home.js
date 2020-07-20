import React, {useState} from 'react';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';

const Home = (props) => {
    const [logForm, setlogForm] = useState(true);

    const toggleForm = () => {
        setlogForm(!logForm);
    };


    if (logForm) {
        return <Login toggleForm={toggleForm} {...props}/>
    } else if (!logForm) {
        return <Signup toggleForm={toggleForm} {...props}/>
    };
};

export default Home;