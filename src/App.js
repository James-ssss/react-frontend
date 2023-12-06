import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import NaviBar from './Components/Navibar';
import LoginForm from './Login';
import { Route, BrowserRouter as Router, Link, Routes} from 'react-router-dom';

import {CreateTask} from './CreateTask';
import {Tasks} from './Tasks';
import axios from 'axios';

function App() {
  const [dataTable, setDataTable] = useState([]);
  

  useEffect (() => {
    axios('https://jsonplaceholder.typicode.com/users')
      .then(res => setDataTable(res.data))
      .catch(err => console.log(err))
  }, []);

  const column = [
    { heading: 'Name'},
    { heading: 'Email'},
    { heading: 'Phone'}
  ]
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
