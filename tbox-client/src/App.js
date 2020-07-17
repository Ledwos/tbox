import React from 'react';
import {
  Switch,
  Route,
  useHistory,
  Redirect
} from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login.js';
import Dash from './components/Dash/Dash.js';
import News from './components/News/News.js';
import Photos from './components/Photos/Photos.js';
import Sport from './components/Sport/Sport.js';
import Tasks from './components/Tasks/Tasks.js';


function App() {

  // routing
  let history = useHistory();

  const dashPage = () => {
    history.push('/dash')
  };
  const newsPage = () => {
    history.push('/news')
  };
  const photosPage = () => {
    history.push('/photos')
  };
  const sportPage = () => {
    history.push('/sport')
  };
  const tasksPage = () => {
    history.push('/tasks')
  };

  return (
    <div>
      {/* <p>I'm the login / signup comp</p> */}
      {/* <p onClick={dashPage}>go to dash</p> */}
    <Switch>
      <Route exact path='/' children={<Login dash={dashPage} />} />
      <Route exact path='/dash' children={<Dash news={newsPage} photos={photosPage} sport={sportPage} tasks={tasksPage} />} />
      <Route exact path='/News' children={<News />} />
      <Route exact path='/Photos' children={<Photos />} />
      <Route exact path='/Sport' children={<Sport />} />
      <Route exact path='/Tasks' children={<Tasks />} />
    </Switch>
    </div>
  );
}

export default App;
