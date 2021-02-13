import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import classes from './TwitterCloud.module.css';
import SpinnerBreak from '../../UI/Spinner/SpinnerBreak';

const TwitterCloud = () => {
    const [showDescription, setShowDescription] = useState(true);
    const [image, setImage] = useState(<p>Loading</p>);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [altText, setAltText] = useState('');
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
                    setAltText('Tweets Not Found');
                }
            }).catch(() => {
                console.log('failed');
            });
        //isSubscribed = false;
    };
    let page = <div>Internal Logic Error</div>;
    //Sets which version of the page shows
    if (showDescription) {
        page = <div className={classes.description}>
                <h1>Twitter WordCloud Generator</h1>
                <p>
                    This is a small webapp that searches popular tweets for some search query given to it.
                    It uses those tweets to produce a word cloud showing which words are associated with
                    the search query used.
                </p>
            </div>
    } else {
        page = [
            loading ? <SpinnerBreak key='1' /> :<img className={classes.image} src={image} alt={altText} key='1'/>,
            <input className={classes.inputBox}
                type='text'
                placeholder='Search Term'
                onInput={(input) => setSearchTerm(input.target.value)}
                key='2' />,
            <Button key='3' className={classes.runButton} variant='dark' onClick={loading ? () => {} :() => requestImage(searchTerm)}>Generate Wordcloud</Button>
        ]
    };

    return (
        <div className={classes.flexcontainer}>
            {page}
            <Button className={classes.prevButton} variant='dark' onClick={() => setShowDescription(true)}>Prev</Button>
            <Button className={classes.nextButton} variant='dark' onClick={() => setShowDescription(false)}>Next</Button>
        </div>
    );
}

export default TwitterCloud;