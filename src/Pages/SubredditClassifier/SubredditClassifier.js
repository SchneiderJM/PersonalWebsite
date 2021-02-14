import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import classes from './SubredditClassifier.module.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';

const SubredditClassifier = () => {
    const [loading,setLoading] = useState(false);
    const [subreddit,setSubreddit] = useState('');
    const [searchTerm,setSearchTerm] = useState('None');
    const [showDescription, setShowDescription] = useState(true);
    function requestClassification(searchTerm){
        setLoading(true);
        //I feel like I should do something here, maybe it's just if I'm using useEffect which I'm not idk
        //let isSubscribed = true;
        axios.get('https://subredditclassifier-74ianjca5q-uc.a.run.app/', {params: {query: searchTerm}})
        .then(response => {
            setSubreddit(response['data']['subredditName']);
            setLoading(false);
            
        })
    };

    let page = <div>Internal Logic Error</div>;

    if (showDescription){
        page = <div className={classes.container}><p>Description</p></div>
    }
    else{
        page = <Container className={classes.container}>
        <Row>
            {loading ? <Spinner /> : <p>{subreddit}</p>}
        </Row>
        <Row>
            <input 
                className={classes.inputText}
                type='text'
                placeholder='Search Term'
                onInput={(input) => setSearchTerm(input.target.value)} />
        </Row>
        <Row>
            <Button className={classes.runButton} variant='dark'  onClick={loading ? () => {} :() => requestClassification(searchTerm)}>Click me</Button>
        </Row>
    </Container>
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
