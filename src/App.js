import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NaviBar from './Components/Navibar';
import { Route, BrowserRouter as Router, Link, Routes} from 'react-router-dom';

import CreateTask from './pages/CreateTask';
import Login from './pages/Login';
import Tasks from './pages/Tasks'
import CreateUser from './pages/CreateUser';
import Materials from './pages/Materials';
import CreateMaterials from './pages/CreateMaterials';
import EditMaterials from './pages/EditMaterials';
import DeleteMaterials from './pages/DeleteMaterials';
import Users from './pages/Users';
import EditUser from './pages/EditUser';
import Address from './pages/Address';
import CreateAddress from './pages/CreateAddress';
import DeleteAddress from './pages/DeleteAddress';
import OrderDetail from './pages/OrderDetail';
import MyOrderDetail from './pages/MyOrderDetail';
import MyTasksList from './Components/MyTaskList';
function App() {
  return (
    <>
    <Router>
    <NaviBar/>
    <Routes>
      <Route path='/CreateTask' Component={CreateTask}/>
      <Route path='/Login' Component={Login}/>
      <Route path='/' Component={Login}/>
      <Route path='/CreateUser' Component={CreateUser}/>
      <Route path='/Orders' Component={Tasks}/>
      <Route path='/My_Orders' Component={MyTasksList}/>
      <Route path='/Materials' Component={Materials}/>
      <Route path='/Materials/Create' Component={CreateMaterials}/>
      <Route path='/Users/Create' Component={CreateUser}/>
      <Route path='/Users/Edit' Component={EditUser}/>
      <Route path='/Materials/Edit' Component={EditMaterials}/>
      <Route path='/Materials/Delete' Component={DeleteMaterials}/>
      <Route path='/Users' Component={Users}/>
      <Route path='/Address' Component={Address}/>
      <Route path='/Address/Create' Component={CreateAddress}/>
      <Route path='/Address/Delete' Component={DeleteAddress}/>
      <Route path='/My_Orders/:orderId' Component={MyOrderDetail}/>
      <Route path='/Orders/:orderId' Component={OrderDetail}/>
    </Routes>
    </Router>
    </>
  );
}

export default App;
