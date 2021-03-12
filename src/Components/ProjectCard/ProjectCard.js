import React, {useState, useEffect} from 'react';
import classes from './ProjectCard.module.css';
import {Link} from 'react-router-dom';

const ProjectCard = (props) => {
    const [cardChildren,setCardChildren] = useState(<div>Empty Card</div>)
    //useState and useEffect may be unnecessary here, it's so I can change the order of the items
    //depending on whether the card is right-oriented or left-oriented
    useEffect(()=>{
        if (props.orientLeft){
            setCardChildren([
                <div key={props.keyValue} className={classes.leftGrid}>
                    <Link to={props.Link}><h1 className={classes.ProjectTitle}>{props.Name}</h1></Link>
                    <Link to={props.Link}><p className={classes.ProjectDescription}>{props.Description}</p></Link>
                </div>,
                <Link key={props.keyValue+1} to={props.Link}><img className={classes.ProjectLogo} src={props.Logo} alt='Logo Not Found' /></Link>
            ])
        }
        else {
            setCardChildren([
                <Link key={props.keyValue} to={props.Link}><img className={classes.ProjectLogo} src={props.Logo} alt='Logo Not Found' /></Link>,
                <div key={props.keyValue+1} className={classes.rightGrid}>
                    <Link to={props.Link}><h1 className={classes.ProjectTitle}>{props.Name}</h1></Link>
                    <Link to={props.Link}><p className={classes.ProjectDescription}>{props.Description}</p></Link>
                </div>
            ])
        }
    },[props.Description,props.Logo,props.Name,props.keyValue,props.orientLeft,props.Link]);
    return(
        <div className={props.orientLeft ? classes.leftCard : classes.rightCard}>
            {cardChildren}
        </div>
    )
};

export default ProjectCard;