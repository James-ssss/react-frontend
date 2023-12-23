import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import NaviBar from './Components/Navibar';
import { Route, BrowserRouter as Router, Link, Routes} from 'react-router-dom';

import CreateTask from './pages/CreateTask';
import Login from './pages/Login';
import Tasks from './pages/Tasks'
import CreateUser from './pages/CreateUser';
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
