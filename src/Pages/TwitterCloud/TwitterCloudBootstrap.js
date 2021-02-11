import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import classes from './TwitterCloud.module.css';
import Spinner from '../../UI/Spinner/Spinner';

const TwitterCloud = () => {
    const [showDescription, setShowDescription] = useState(true);
    const [image, setImage] = useState(<p>Loading</p>);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    function requestImage(searchTerm) {
        setLoading(true);
        let isSubscribed = true;
        //https://upload.wikimedia.org/wikipedia/commons/f/f0/Mops_oct09_cropped2.jpg
        axios.get('https://us-central1-personalsitefunctions.cloudfunctions.net/sendTwitterCloud',
            { responseType: 'arraybuffer', params: { query: searchTerm } })
            .then(response => {
                if (isSubscribed) {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            '',
                        ),
                    );
                    setImage("data:;base64," + base64)
                    setLoading(false);
                }
            });
        //isSubscribed = false;
    };
    let page = <div>Internal Logic Error</div>
    //Sets which version of the page shows
    if (showDescription) {
        page = <div>Description</div>
    } else {
        page = <div><Row className='justify-content-md-center'>
        {loading ?<Spinner /> :<img className={classes.image} src={image} alt='' />}
    </Row>
    <Row className='justify-content-md-center'>
        <input 
        type='text'
        className={classes.inputBox}
        placeholder='Search Term'
        onInput={(input) => setSearchTerm(input.target.value)} />
    </Row>
    <Row className='justify-content-md-center'>
        <Button variant='dark' onClick={loading ? () => {} :() => requestImage(searchTerm)}>Click me</Button>
    </Row></div>
    };

    return (
        <Container className={classes.container}>
            {page}
            <Row className='justify-content-md-center'>
                <Col><Button variant='dark' onClick={() => setShowDescription(true)}>Prev</Button></Col>
                <Col><Button variant='dark' onClick={() => setShowDescription(false)}>Next</Button></Col>
            </Row>
        </Container>
    );
}

export default TwitterCloud;