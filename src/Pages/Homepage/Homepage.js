import React from 'react';
import classes from './Homepage.module.css';
import homeimage from '../../Assets/pug_placeholder.jpg';

const Homepage = () => {
    return(
        <div className={classes.mainContainer}>
            <div className={classes.Header}>
                <h1>Hi, I'm Jason.</h1>
            </div>
            <img className={classes.Photo} src={homeimage} alt={'Failed to load'}/>
            <div className={classes.Description}>Description</div>
        </div>
    )
}

export default Homepage;
