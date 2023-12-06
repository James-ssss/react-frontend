import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import NaviBar from './Components/Navibar';
import { Route, BrowserRouter as Router, Link, Routes} from 'react-router-dom';

import CreateTask from './Components/CreateTask';
import Login from './Components/Login';
import Tasks from './Components/Tasks'
import CreateUser from './Components/CreateUser';
function App() {
  return (
    <>
    <Router>
    <NaviBar/>
    <Routes>
      <Route path='/CreateTask' Component={CreateTask}/>
      <Route path='/Login' Component={Login}/>
      <Route path='/CreateUser' Component={CreateUser}/>
      <Route path='/Tasks' Component={Tasks}/>
    </Routes>
    </Router>
    

    </>
  );
}

export default App;
