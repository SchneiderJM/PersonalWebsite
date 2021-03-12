import React, {useState} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import classes from './NavigationBar.module.css';
import HamburgerIcon from '../Assets/Hamburger_Menu.png';
import Modal from '../UI/Modal/Modal';
import Logo from '../Assets/Logo_800x800_Cropped.png';

const NavigationBar = () => {
    const [showBar,setShowBar] = useState(false);

    //Definitely not efficient, might clean this up later
    const verticalBar = (
    <Navbar bg='dark' variant='dark' className={classes.VertNavBar}>
        <Nav className = {['mr-auto','flex-column'].join(' ')}>
            <Navbar.Brand>
                <img src={HamburgerIcon} 
                alt="Where Hamburger???" 
                onClick={() => setShowBar(!showBar)}
                className={classes.brandBurger}/>
            </Navbar.Brand>
            <Nav.Link as={Link} onClick={() => setShowBar(!showBar)} to='/' >Homepage</Nav.Link>
            <Nav.Link as={Link} onClick={() => setShowBar(!showBar)} to='/Twitter_Cloud'>Twitter Cloud</Nav.Link>
            <Nav.Link as={Link} onClick={() => setShowBar(!showBar)} to='/Reddit_Classifier'>Reddit Post Classifier</Nav.Link>
            <Nav.Link as={Link} onClick={() => setShowBar(!showBar)} to='/WSB_Analytics'>WallStreetBets Analytics</Nav.Link>
            <Nav.Link as={Link} onClick={() => setShowBar(!showBar)} to='/Contact'>Contact</Nav.Link>
        </Nav>
    </Navbar>)

    return(
        <>
        {showBar ? <Modal onClick={() => setShowBar(!showBar)}/> : null}
        {showBar ? null : <img className={classes.Hamburger} 
            src={HamburgerIcon} 
            alt='Where the Burger???' 
            onClick={() => setShowBar(!showBar)}/>}
        {showBar ? verticalBar : null}
        <Navbar bg='dark' variant='dark' className={classes.NavBar}>
            <Navbar.Brand><img src={Logo} alt='Where Logo' className={classes.cornerLogo} /></Navbar.Brand>
            <Nav className = 'mr-auto'>
                <Nav.Link as={Link} to='/' >Homepage</Nav.Link>
                <Nav.Link as={Link} to='/Twitter_Cloud'>Twitter Cloud</Nav.Link>
                <Nav.Link as={Link} to='/Reddit_Classifier'>Reddit Post Classifier</Nav.Link>
                <Nav.Link as={Link} to='/WSB_Analytics'>WallStreetBets Analytics</Nav.Link>
                <Nav.Link as={Link} to='/Contact'>Contact</Nav.Link>
            </Nav>
        </Navbar>
        </>
    )
}

export default NavigationBar;