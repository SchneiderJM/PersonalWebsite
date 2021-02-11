import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
//import Col from 'react-bootstrap/Col';
import classes from './SubredditClassifier.module.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';

const SubredditClassifier = () => {
    const [loading,setLoading] = useState(false);
    const [subreddit,setSubreddit] = useState('');
    const [searchTerm,setSearchTerm] = useState('None');
    function requestClassification(searchTerm){
        setLoading(true);
        //I feel like I should do something here, maybe it's just if I'm using useEffect which I'm not idk
        //let isSubscribed = true;
        axios.get('https://subredditclassifier-74ianjca5q-uc.a.run.app/', {params: {query: searchTerm}})
        .then(response => {
            setSubreddit(response['data']['subredditName']);
            setLoading(false);
            
        })
    }
    return(
        <Container className={classes.container}>
            <Row>
                {loading ? <Spinner /> : <p>{subreddit}</p>}
            </Row>
            <Row>
                <input 
                    type='text'
                    placeholder='Search Term'
                    onInput={(input) => setSearchTerm(input.target.value)} />
            </Row>
            <Row>
                <Button variant='dark'  onClick={loading ? () => {} :() => requestClassification(searchTerm)}>Click me</Button>
            </Row>
        </Container>
    )
}
export default SubredditClassifier;