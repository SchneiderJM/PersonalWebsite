import React from 'react';
import classes from './Contact.module.css';

const Contact = () => {
    return(
        <div className={classes.flexContainer}>
            <h1>Contact me via e-mail</h1>
            <p>This doesn't actually work yet</p>
            <input placeholder='First Name' />
        </div>
    )
};

export default Contact;
