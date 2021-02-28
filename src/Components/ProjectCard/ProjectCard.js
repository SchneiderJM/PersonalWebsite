import React, {useState, useEffect} from 'react';
import classes from './ProjectCard.module.css';

const ProjectCard = (props) => {
    const [cardChildren,setCardChildren] = useState(<div>Empty Card</div>)
    useEffect(()=>{
        if (props.orientLeft){
            setCardChildren([
                <h1 key={props.keyValue+1} className={classes.ProjectTitle}>{props.Name}</h1>,
                <img key={props.keyValue} className={classes.ProjectLogo} src={props.Logo} alt='Logo Not Found' />,
                <p key={props.keyValue+2} className={classes.ProjectDescription}>{props.Description}</p>,
                <div key={props.keyValue+3}></div>
            ])
        } else {
            setCardChildren([
                <img key={props.keyValue+2} className={classes.ProjectLogo} src={props.Logo} alt='Logo Not Found' />,
                <h1 key={props.keyValue} className={classes.ProjectTitle}>{props.Name}</h1>,
                <div key={props.keyValue+3}></div>,
                <p key={props.keyValue+1} className={classes.ProjectDescription}>{props.Description}</p>
            ])
        }
    },[props.Description,props.Logo,props.Name,props.keyValue,props.orientLeft]);
    return(
        <div className={props.orientLeft ? classes.leftCard : classes.rightCard}>
            {cardChildren}
        </div>
    )
};

export default ProjectCard;