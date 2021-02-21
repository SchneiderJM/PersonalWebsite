import React, {useState} from 'react';
import classes from './SubredditClassifier.module.css'
import {Button} from 'react-bootstrap';
import axios from 'axios';
import Spinner from '../../UI/Spinner/SpinnerBreak';

const SubredditClassifier = () => {
    const [loading,setLoading] = useState(false);
    const [subreddit,setSubreddit] = useState('');
    const [searchTerm,setSearchTerm] = useState('None');
    const [showDescription, setShowDescription] = useState(true);
    function requestClassification(searchTerm){
        setLoading(true);
        //I feel like I should do something here, maybe it's just if I'm using useEffect which I'm not idk
        //let isSubscribed = true;
        axios.get('https://subreddit-classifier-rawtnoo3mq-uc.a.run.app/', {params: {query: searchTerm}})
        .then(response => { 
            setSubreddit(response['data']['subredditName']);
            setLoading(false);
            
        })
    };

    let page = <div>Internal Logic Error</div>;

    if (showDescription){
        page = <div className={classes.container}>
                <h1 className={classes.header}>Subreddit Classifier</h1>
                <p>The social media website Reddit is an image board subdivided into sections called "Subreddits." These subreddits are based around a certain theme, eg r/WorldNews is about news, r/aww is for photos of cute animals.</p>
                <p>This app attempts to classify on which Subreddit a post would fit using the post's title. It currently supports six of the most popular Subreddits.</p>
                <p>The model uses TF-IDF to generate features from the supplied text and then uses XGBoost as a classifier. A Jupyter notebook going over the procedure in more detail can be found here:</p>
                <a href='https://github.com/SchneiderJM/Subreddit-Classifier'><p>Jupyter Notebook Link</p></a>
            </div>
    }
    else{
        page = [
            loading ? <Spinner key='1' /> : 
            <p className={classes.classifiedText} key='1'>
                This post should go on r/{subreddit}
            </p>,
            <input 
                className={classes.inputBox}
                key='2'
                type='text'
                placeholder='Search Term'
                onInput={(input) => setSearchTerm(input.target.value)} />,
            <Button key='3' className={classes.runButton} variant='dark'  onClick={loading ? () => {} :() => requestClassification(searchTerm)}>Get Classification</Button>
        ]
        }

    return(
        <div className={classes.flexcontainer}>
            {page}
            <Button className={classes.prevButton} variant='dark' onClick={() => setShowDescription(true)}>Prev</Button>
            <Button className={classes.nextButton} variant='dark' onClick={() => setShowDescription(false)}>Next</Button>
        </div>
    )
}
export default SubredditClassifier;
