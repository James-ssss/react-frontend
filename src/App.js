import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import NaviBar from './Components/Navibar';
import { Route, BrowserRouter as Router, Link, Routes} from 'react-router-dom';

import CreateTask from './pages/CreateTask';
import Login from './pages/Login';
import Tasks from './pages/Tasks'
import CreateUser from './pages/CreateUser';
import Materials from './pages/Materials';
import CreateMaterials from './pages/CreateMaterials';
import EditMaterials from './pages/EditMaterials';
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
      <Route path='/Materials' Component={Materials}/>
      <Route path='/Materials/Create' Component={CreateMaterials}/>
      <Route path='/Materials/Edit' Component={EditMaterials}/>
    </Routes>
    </Router>
    

    </>
  );
}

export default App;
