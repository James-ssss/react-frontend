import React from "react";
import {Navbar, Nav, Button, NavLink} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function NaviBar(){
    if (localStorage.getItem('jwt') === null){
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand>Строительная компания</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                           
                        </Nav> 
                        <Button variant="primary" href='/Login'>Вход</Button>
                    </Navbar.Collapse>  
                </Navbar>
            </>
        );
    }
    else {
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand>Строительная компания</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink ><Link to="/CreateTask">Создать новую заявку</Link></NavLink>
                            <NavLink ><Link to="/Tasks">Посмотреть заявки</Link></NavLink>
                        </Nav>
                        <Nav>
                            <Button variant="primary" onClick={() => {
                                localStorage.removeItem('jwt');
                                window.location.reload();
                            }}>Выйти</Button>
                        </Nav>
                    </Navbar.Collapse>   
                </Navbar>
            </>
        );
    }
    
    
}