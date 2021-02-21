import React, {useState, useEffect} from 'react';
import classes from './Contact.module.css';
import {Button} from 'react-bootstrap';
import GitHubLogo from '../../Assets/GitHub_Logo.png';
import LinkedInLogo from '../../Assets/LinkedIn_Logo.png';
import emailjs, {init} from 'emailjs-com';



const Contact = () => {
    const [templateParams,setTemplateParams] = useState({});
    const [confirmation,setConfirmation] = useState(<div></div>);

    init('user_QOfx4DszJGZnpEsBPH22V')
    useEffect(() => {
        setTemplateParams({
            firstName: 'First Name',
            lastName: 'Last Name',
            message: 'this is the message, please clap',
            reply_to: 'fuckoffnsa'
        });
    },[]);

    const setFirstName = (firstName) => {
        setTemplateParams( prevTemplate => {
            return{
                ...prevTemplate,
                firstName: firstName
            }
        })
    };

    const setLastName = (lastName) => {
        setTemplateParams(prevTemplate => {
            return{
                ...prevTemplate,
                lastName: lastName
            }
        })
    };

    const setEmail = (email) => {
        setTemplateParams(prevTemplate => {
            return{
                ...prevTemplate,
                reply_to: email
            }
        })
    };

    const setMessage = (message) => {
        setTemplateParams(prevTemplate => {
            return{
                ...prevTemplate,
                message: message
            }
        })
    }
    const sendEmail = () => {
        emailjs.send('service_6dbwzpd','template_dwqbq4k', templateParams, 'user_QOfx4DszJGZnpEsBPH22V')
            .then((response) => {
                if (response.status === 200){
                    setConfirmation(<p className={classes.responseMessage}>The message was sent successfully</p>)
                } 
            }, (err) => {
                setConfirmation(<p className={classes.responseMessage}>The message failed to send</p>)
                console.log('FAILED...', err);
            }
        );
    };

    
    return(
        <div className={classes.flexContainer}>
            <div className={classes.leftContainer}>
                <h1 className={classes.Headline}>Contact me via email</h1>
                <p id={classes.warning}>This works now but I still won't reply.</p>
                <input placeholder='First Name' 
                id={classes.firstName}
                type='text'
                onInput = {input => {setFirstName(input.target.value)}}/>
                <input placeholder='Last Name'
                id={classes.lastName}
                onInput = {(input) => setLastName(input.target.value)}/>

                <input placeholder='Your Email' 
                id={classes.email}
                onInput = {(input) => setEmail(input.target.value)}/>
                <textarea placeholder='Message' 
                className={classes.messageText}
                onInput = {(input) => setMessage(input.target.value)}/>
                <Button variant='dark' className={classes.submitButton} onClick={sendEmail}>Submit</Button>
                {confirmation}
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
