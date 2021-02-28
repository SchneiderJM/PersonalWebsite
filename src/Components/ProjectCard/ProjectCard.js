import React from 'react';
import classes from './ProjectCard.module.css';

const ProjectCard = (props) => {
    return(
        <div>
            <p className={classes.ProjectTitle}>{props.Name}</p>
            <img className={classes.ProjectLogo} src={props.Logo} alt='Logo Not Found' />
            <p className={classes.ProjectDescription}>{props.Description}</p>
        
        </div>
    )
};

export default ProjectCard;