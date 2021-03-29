import { Route, RouteHandler, Link } from 'react-router';
import { Button, Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ApplicationFrame.css';



import { NavLink } from 'react-router-dom';


import React, { useState } from "react";



function ApplicationFrame() {

    const [user, setUser] = useState("Henry the third"); // hae käyttäjän nimi komponentista


    // tai sitten lataa suoraan html:ssä getuser datalla nimi

    // eriytä api kutsut omiksi komponenteiksi jota kutsutaan tarvittaessa



    return (
        <div >
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#home">MeFit</Navbar.Brand>
                <Nav className="mr-auto">



                    <LinkContainer className='navBarLink' to="/profile">
                        <Nav.Link eventKey="disabled" disabled>Logged in: {user}</Nav.Link>
                    </LinkContainer>

                    <Nav variant="pills" defaultActiveKey="dashboard">
                        <LinkContainer className='navBarLink' to="/programs">
                            <Nav.Link title="dashboard" eventKey="dashboard">Dashboard</Nav.Link>
                        </LinkContainer>

                        <LinkContainer className='navBarLink' to="/programs">
                            <Nav.Link>Goals</Nav.Link>
                        </LinkContainer>

                        <LinkContainer className='navBarLink' to="/programs">
                            <Nav.Link>Workouts</Nav.Link>
                        </LinkContainer>

                        <LinkContainer className='navBarLink' to="/programs">
                            <Nav.Link>Programs</Nav.Link>
                        </LinkContainer>

                        <LinkContainer className='navBarLink' to="/programs">
                            <Nav.Link>Exercises</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Nav>

                <LinkContainer to="/profile">
                    <Nav.Link >Profile</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/404">
                    <Nav.Link >Logout</Nav.Link>
                </LinkContainer>
            </Navbar>
        </div>
    )
}
export default ApplicationFrame;