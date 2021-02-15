import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const NavigationBar = () => {
    return(
        <Navbar bg='dark' variant='dark'>
            <Navbar.Brand>Website</Navbar.Brand>
            <Nav className = 'mr-auto'>
                <Nav.Link as={Link} to='/' >Homepage</Nav.Link>
                <Nav.Link as={Link} to='/Twitter_Cloud'>Twitter Cloud</Nav.Link>
                <Nav.Link as={Link} to='/Reddit_Classifier'>Reddit Post Classifier</Nav.Link>
                {/*<Nav.Link as={Link} to='/WSB_Analytics'>Wall Street Bets</Nav.Link>*/}
                <Nav.Link as={Link} to='/Contact'>Contact</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default NavigationBar;