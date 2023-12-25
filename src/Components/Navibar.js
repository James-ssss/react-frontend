import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, NavLink } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export default function NaviBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('jwt') !== null && localStorage.getItem('role') !== null);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
  };

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('jwt') !== null && localStorage.getItem('role') !== null);
  }, [location.pathname]); // Обновлять состояние isLoggedIn при изменении пути

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Строительная компания</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && localStorage.getItem('role') == "ADMIN" &&(
              <>
                <NavLink as={Link} to="/createTask" className={location.pathname === '/createTask' ? 'active' : ''}>Создать новую заявку</NavLink>
                <NavLink as={Link} to="/orders" className={location.pathname === '/orders' ? 'active' : ''}>Посмотреть заявки</NavLink>
                <NavLink as={Link} to="/materials" className={location.pathname === '/materials' ? 'active' : ''}>Материалы</NavLink>
                <NavLink as={Link} to="/users" className={location.pathname === '/users' ? 'active' : ''}>Пользователи</NavLink>
                <NavLink as={Link} to="/Address" className={location.pathname === '/Address' ? 'active' : ''}>Адреса</NavLink>
              </>
            )}
            {isLoggedIn && localStorage.getItem('role') == "STAFF" &&(
              <>
                <NavLink as={Link} to="/users" className={location.pathname === '/users' ? 'active' : ''}>Пользователи</NavLink>
                <NavLink as={Link} to="/createTask" className={location.pathname === '/createTask' ? 'active' : ''}>Создать новую заявку</NavLink>
                <NavLink as={Link} to="/orders" className={location.pathname === '/orders' ? 'active' : ''}>Посмотреть заявки</NavLink>
                <NavLink as={Link} to="/materials" className={location.pathname === '/materials' ? 'active' : ''}>Материалы</NavLink> 
                <NavLink as={Link} to="/Address" className={location.pathname === '/Address' ? 'active' : ''}>Адреса</NavLink>
              </>
            )}
            {isLoggedIn && localStorage.getItem('role') == "USER" &&(
              <>
                <NavLink as={Link} to="/createTask" className={location.pathname === '/createTask' ? 'active' : ''}>Создать новую заявку</NavLink> 
                <NavLink as={Link} to="/Address" className={location.pathname === '/Address' ? 'active' : ''}>Адреса</NavLink>
              </>
            )}
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <Button variant="primary" as={Link} to="/" onClick={handleLogout}>Выйти</Button>
            ) : (
              <Button variant="primary" as={Link} to="/login">Вход</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
