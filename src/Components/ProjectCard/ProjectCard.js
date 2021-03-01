import React, {useState, useEffect} from 'react';
import classes from './ProjectCard.module.css';
import {Link} from 'react-router-dom';

const ProjectCard = (props) => {
    const [cardChildren,setCardChildren] = useState(<div>Empty Card</div>)
    useEffect(()=>{
        if (props.orientLeft){
            setCardChildren([
                <Link to={props.Link}><h1 key={props.keyValue+1} className={classes.ProjectTitle}>{props.Name}</h1></Link>,
                <Link to={props.Link}><img key={props.keyValue} className={classes.ProjectLogo} src={props.Logo} alt='Logo Not Found' /></Link>,
                <Link to={props.Link}><p key={props.keyValue+2} className={classes.ProjectDescription}>{props.Description}</p></Link>,
                <Link to={props.Link}><div key={props.keyValue+3}></div></Link>
            ])
        } else {
            setCardChildren([
                <Link to={props.Link}><img key={props.keyValue+2} className={classes.ProjectLogo} src={props.Logo} alt='Logo Not Found' /></Link>,
                <Link to={props.Link}><h1 key={props.keyValue} className={classes.ProjectTitle}>{props.Name}</h1></Link>,
                <Link to={props.Link}><div key={props.keyValue+3}></div></Link>,
                <Link to={props.Link}><p key={props.keyValue+1} className={classes.ProjectDescription}>{props.Description}</p></Link>
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