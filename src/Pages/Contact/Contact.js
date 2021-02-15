import React from 'react';
import classes from './Contact.module.css';
import Button from 'react-bootstrap/button';
import GitHubLogo from '../../Assets/GitHub_Logo.png';
import LinkedInLogo from '../../Assets/LinkedIn_Logo.png'

const Contact = () => {
    return(
        <div className={classes.flexContainer}>
            <div className={classes.leftContainer}>
                <h1 className={classes.Headline}>Contact me via email</h1>
                <p id={classes.warning}>This doesn't work yet so I won't reply</p>
                <input placeholder='First Name' id={classes.firstName}/>
                <input placeholder='Last Name'  id={classes.lastName}/>

                <input placeholder='Your Email' id={classes.email}/>
                <textarea placeholder='Message' className={classes.messageText}/>
                <Button variant='dark' className={classes.submitButton}>Submit</Button>
            </div>
            <div className={classes.rightContainer}>
                <h1 id={classes.mediaTitle}>Social Media Links</h1>
                <div className={classes.mediaLinks}>
                    <a 
                    href='https://github.com/schneiderjm' 
                    target="_blank"
                    rel="noreferrer noopener">
                        <img src={GitHubLogo} alt='GitHub Logo Missing' />
                    </a>
                    <a 
                    href='https://linkedin.com/in/jams'
                    target="_blank"
                    rel="noreferrer noopener">
                        <img src={LinkedInLogo} alt='LinkedIn Logo Missing' />
                    </a>
                </div>
            </div>
        </div>
    )
};

export default Contact;
