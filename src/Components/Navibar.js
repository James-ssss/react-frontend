import React from "react";
import {Navbar, Nav, Button, NavLink} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function NaviBar(){
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>Строительная компания</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink><Link to="/CreateTask">Создать заявку</Link></NavLink>
                    </Nav>
                    <Nav>
                        <Button variant="primary">Выйти</Button>
                    </Nav>
                </Navbar.Collapse>   
            </Navbar>
        </>
    );
    
}