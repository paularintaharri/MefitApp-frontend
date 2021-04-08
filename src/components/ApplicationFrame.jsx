import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import KeycloakConnection from './KeycloakConnection';
import { getUserStorage } from '../utils/userStorage';
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ApplicationFrame.css';

function ApplicationFrame() {

    const { token, tokenParsed } = getUserStorage('ra_session');
    const [user, setUser] = useState("paula testi");

    useEffect(() => {

        if (tokenParsed) {
            setUser(tokenParsed.name);
        }
    }, []);

    return (
        <div >
            <Navbar bg="light" variant="light">
                <Navbar.Brand >MeFit</Navbar.Brand>
                <Nav className="mr-auto">
                    <LinkContainer className='navBarLink' to="/profile">
                        <Nav.Link eventKey="disabled" disabled >Logged in: {tokenParsed && user}</Nav.Link>
                    </LinkContainer>

                    <Nav variant="pills" defaultActiveKey="dashboard">
                        <LinkContainer className='navBarLink' to="/dashboard">
                            <Nav.Link title="dashboard" eventKey="dashboard">Dashboard</Nav.Link>
                        </LinkContainer>

                        <LinkContainer className='navBarLink' to="/workouts">
                            <Nav.Link>Workouts</Nav.Link>
                        </LinkContainer>

                        <LinkContainer className='navBarLink' to="/exercises">
                            <Nav.Link >Exercises</Nav.Link>
                        </LinkContainer>

                        <LinkContainer className='navBarLink' to="/profile">
                            <Nav.Link >Profile</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Nav>
                <Nav className="mr-auto">
                    <KeycloakConnection />
                </Nav>
            </Navbar>
        </div>
    )
}
export default ApplicationFrame;