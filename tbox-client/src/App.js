import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  useHistory,
  Redirect
} from 'react-router-dom';
import './App.css';
// import Login from './components/Login/Login.js';
import Dash from './components/Dash/Dash.js';
import News from './components/News/News.js';
import Photos from './components/Photos/Photos.js';
import Sport from './components/Sport/Sport.js';
import Tasks from './components/Tasks/Tasks.js';
import Home from'./components/Home/Home';
import fetch from 'node-fetch';


function App() {

  const [nurl, setNurl] = useState('');
  const [loggedIn, setloggedIn] = useState('false');
  const [uname, setuname] = useState('');
  const [uid, setuid] = useState('');
  const [errTxt, seterrTxt] = useState(false);
  const [futbol, setFutbol] = useState([]);

  useEffect(() => {
    logState();
  }, [loggedIn]);

  // routing
  let history = useHistory();

  const dashPage = () => {
    history.push('/dash');
  };
  const newsPage = () => {
    history.push('/news');
  };
  const photosPage = () => {
    history.push('/photos');
  };
  const sportPage = () => {
    history.push('/sport');
  };
  const tasksPage = () => {
    history.push('/tasks');
  };
  const homePage = () => {
    history.push('/');
  };

  const newsurl = (url) => {
    setNurl(url);
    newsPage();
    // console.log(url);
  }

  const logState = () => {
    const logStatus = localStorage.getItem('loggedIn');
    const uId = localStorage.getItem('uId');
    const uName = localStorage.getItem('uName');
    // console.dir({
    //   "status": logStatus,
    //   "id": uId,
    //   "name": uName
    // });
    setloggedIn(logStatus);
    setuid(uId);
    setuname(uName);
  }

  const logOut = () => {
    localStorage.clear();
    logState();
    homePage();
  };

  // handle login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = document.getElementById('u_email').value;
    const pass = document.getElementById('u_pass').value;
    let resStatus;
    fetch('/db/login', {
      mode: 'cors',
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "email": email,
          "pass": pass,
      })
    })
    .then(response => {
      resStatus = response.status;
      return response.json();
    })
    .then(data => {
      if (resStatus === 200) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('uId', data.uid);
        localStorage.setItem('uName', data.name);
        logState();
        dashPage();
      } else if (resStatus === 400) {
        seterrTxt(!errTxt);
      }
    })
  };

  // get sport data
  const getSportData = (teamName) => {
    // let team = teamName
    fetch(`api/sports/${teamName}`)
    .then(response => {
        if (response.status === 200) {
            response.json()
            .then(data => setFutbol(data));
        } else if (response.status === 404) {
            console.log('no team with that name');
        };
    });
};

  return (
    <div>
    <Switch>
      <Route exact path='/' children={loggedIn == 'true' ? <Redirect to='/dash' /> : <Home handleLogin={handleLogin} errTxt={errTxt} dashPage={dashPage}/> } />
      <Route exact path='/dash' children={<Dash futbol={futbol} getSportData={getSportData} logout={logOut} uid={uid} uname={uname} newsurl={newsurl} news={newsPage} photos={photosPage} sport={sportPage} tasks={tasksPage} />} />
      <Route exact path='/News' children={<News nurl={nurl} />} />
      <Route exact path='/Photos' children={<Photos uid={uid}/>} />
      <Route exact path='/Sport' children={<Sport futbol={futbol} getSportData={getSportData} />} />
      <Route exact path='/Tasks' children={<Tasks uid={uid}/>} />
    </Switch>
    </div>
  );
}

export default App;
