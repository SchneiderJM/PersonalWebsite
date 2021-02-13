import React from 'react';
import classes from './Homepage.module.css'

const Homepage = () => {
    return(
        <div className={classes.mainContainer}>
            <h1 className={classes.Header}>Hi, I'm Jason.</h1>
            <div>Photo</div>
            <div>Description</div>
        </div>
    )
}

export default Homepage;
