import React from "react";
import {Navbar, Nav, Button, NavLink} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function NaviBar(){
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>Хуй в жопе inc.</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink><Link to="/">Создать заявку</Link></NavLink>
                        <NavLink><Link to="/tasks">Заявки</Link></NavLink>
                    </Nav>
                    <Nav>
                        <Button variant="primary" className="me-2">Log In</Button>
                        <Button variant="primary">Sign In</Button>
                    </Nav>
                </Navbar.Collapse>   
            </Navbar>
        </>
    )
    
}