import React from 'react';
import classes from './Homepage.module.css';
import homeimage from '../../Assets/pug_placeholder.jpg';
import ProjectCard from '../../Components/ProjectCard/ProjectCard';

const Homepage = () => {
    return(
        <div className={classes.mainContainer}>
            <div className={classes.Header}>
                <h1>Hi. I'm Jason and this is my website.</h1>
            </div>
            <img className={classes.Photo} src={homeimage} alt={'Failed to load'}/>
            <div className={classes.Description}><p>I am currently employed as a data scientist 
                at Rattlehub Digital where I work on predictive insights models for financial advisors
                as well as digital engagement for collection of estate data. </p> </div>
            <ProjectCard Name='Sample Project' Logo={homeimage} />
        </div>
    )
}

export default Homepage;
