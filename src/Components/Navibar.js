import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, NavLink } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export default function NaviBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('jwt') !== null);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
  };

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('jwt') !== null);
  }, [location.pathname]); // Обновлять состояние isLoggedIn при изменении пути

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Строительная компания</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && (
              <>
                <NavLink as={Link} to="/CreateTask" className={location.pathname === '/CreateTask' ? 'active' : ''}>Создать новую заявку</NavLink>
                <NavLink as={Link} to="/Tasks" className={location.pathname === '/Tasks' ? 'active' : ''}>Посмотреть заявки</NavLink>
                <NavLink as={Link} to="/Materials" className={location.pathname === '/Materials' ? 'active' : ''}>Материалы</NavLink>
                <NavLink as={Link} to="/Users" className={location.pathname === '/Users' ? 'active' : ''}>Пользователи</NavLink>
                <NavLink as={Link} to="/Address" className={location.pathname === '/Address' ? 'active' : ''}>Адреса</NavLink>
              </>
            )}
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <Button variant="primary" as={Link} to="/" onClick={handleLogout}>Выйти</Button>
            ) : (
              <Button variant="primary" as={Link} to="/Login">Вход</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
