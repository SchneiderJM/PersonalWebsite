import React, {useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import classes from './TwitterCloud.module.css';
import Spinner from '../../UI/Spinner/Spinner';

const TwitterCloud = () => {
    const [image,setImage] = useState(<p>Loading</p>);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading,setLoading] = useState(false);
    function requestImage(searchTerm){
        setLoading(true);
        let isSubscribed = true;
        //https://upload.wikimedia.org/wikipedia/commons/f/f0/Mops_oct09_cropped2.jpg
        axios.get('https://us-central1-personalsitefunctions.cloudfunctions.net/sendTwitterCloud',
        { responseType: 'arraybuffer', params: {query: searchTerm}})
        .then(response => {
            if (isSubscribed){
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
    return(
        <div>
            <Row>
                {loading ?<Spinner /> :<img className={classes.image} src={image} alt='Nothing Here' />}
            </Row>
            <Row>
                <input 
                type='text'
                className={classes.inputBox}
                placeholder='Search Term'
                onInput={(input) => setSearchTerm(input.target.value)} />
            </Row>
            <Row>
                <Button variant='dark' className={classes.button} onClick={loading ? () => {} :() => requestImage(searchTerm)}>Click me</Button>
            </Row>
        </div>
    );
}

export default TwitterCloud;