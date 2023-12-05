import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import NaviBar from './Components/Navibar';
import LoginForm from './Login';
import { Route, BrowserRouter as Router, Link, Routes} from 'react-router-dom';

import {CreateTask} from './CreateTask';
import {Tasks} from './Tasks';
function App() {
  return (
    <>
    <Router>
    <NaviBar/>
    <Routes>
      <Route path='/' Component={CreateTask}/>
      <Route path='/tasks' Component={Tasks}/>
    </Routes>
    </Router>
    

    </>
  );
}

export default App;
