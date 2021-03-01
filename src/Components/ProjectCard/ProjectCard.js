import React, {useState, useEffect} from 'react';
import classes from './ProjectCard.module.css';
import {Link} from 'react-router-dom';

const ProjectCard = (props) => {
    const [cardChildren,setCardChildren] = useState(<div>Empty Card</div>)
    useEffect(()=>{
        if (props.orientLeft){
            setCardChildren([
                <Link key={props.keyValue}to={props.Link}><h1 className={classes.ProjectTitle}>{props.Name}</h1></Link>,
                <Link key={props.keyValue+1} to={props.Link}><img className={classes.ProjectLogo} src={props.Logo} alt='Logo Not Found' /></Link>,
                <Link key={props.keyValue+2} to={props.Link}><p className={classes.ProjectDescription}>{props.Description}</p></Link>,
                <Link key={props.keyValue+3} to={props.Link}><div></div></Link>
            ])
        } else {
            setCardChildren([
                <Link key={props.keyValue} to={props.Link}><img className={classes.ProjectLogo} src={props.Logo} alt='Logo Not Found' /></Link>,
                <Link key={props.keyValue+1} to={props.Link}><h1 className={classes.ProjectTitle}>{props.Name}</h1></Link>,
                <Link key={props.keyValue+2} to={props.Link}><div></div></Link>,
                <Link key={props.keyValue+3} to={props.Link}><p className={classes.ProjectDescription}>{props.Description}</p></Link>
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