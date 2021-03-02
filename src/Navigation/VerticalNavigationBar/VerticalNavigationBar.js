import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import HamburgerIcon from '../../Assets/Hamburger_Menu.png';
import {Link} from 'react-router-dom';
import classes from './VerticalNavigationBar.module.css'

const VertNavBar = () => {
    return(
        <Navbar bg='dark' variant='dark' className={classes.NavBar}>
            <Navbar.Brand className={classes.Hamburger}
            ><img src={HamburgerIcon} alt='Where Hamburger???'/></Navbar.Brand>
            <Nav className = {['mr-auto','flex-column'].join(' ')}>
                <Nav.Link as={Link} to='/' >Homepage</Nav.Link>
                <Nav.Link as={Link} to='/Twitter_Cloud'>Twitter Cloud</Nav.Link>
                <Nav.Link as={Link} to='/Reddit_Classifier'>Reddit Post Classifier</Nav.Link>
                <Nav.Link as={Link} to='/WSB_Analytics'>WallStreetBets Analytics</Nav.Link>
                <Nav.Link as={Link} to='/Contact'>Contact</Nav.Link>
            </Nav>
        </Navbar>
    )
};

export default VertNavBar