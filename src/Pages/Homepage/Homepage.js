import React from 'react';
import classes from './Homepage.module.css';
import homeimage from '../../Assets/pug_placeholder.jpg';
import ProjectCard from '../../Components/ProjectCard/ProjectCard';
import WordcloudLogo from '../../Assets/WordcloudLogo.png';

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
            <div className={classes.projectCardContainer}>
                <ProjectCard 
                    keyValue={0} 
                    Name='Sample Project' 
                    Logo={WordcloudLogo} 
                    Description='This is a project description it just goes on and on for a long ass time until we see exactly what happens when it needs to break to a new line' 
                    orientLeft={true}
                />
                <ProjectCard
                    keyValue={0}
                    Name='Sample Right Project'
                    Logo={WordcloudLogo}
                    Description='This tests a right-oriented card'
                    orientLeft={false}
                />
            </div>
        </div>
    )
}

export default Homepage;
