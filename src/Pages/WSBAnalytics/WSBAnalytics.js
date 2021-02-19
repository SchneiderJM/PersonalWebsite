import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import classes from './WSBAnalytics.module.css'

const WSBAnalytics = () => {
    //Holds the ticker symbols and their counts
    const [tickerCounts, setTickerCounts] = useState({'testitem': {0:0,1:1}});

    //Fetches ticker counts from the server
    function fetchTickersFromServer(){
        axios.get('https://wsbtickercounter-rawtnoo3mq-uc.a.run.app/')
            .then(response => {
                setTickerCounts(response['data']['tickers'])
            })
    }

    //Maps the tickers and their counts into table rows
    const items = Object.keys(tickerCounts).map((key) => {
        return(
            <tr key={key}>
                <td>{tickerCounts[key][0]}</td>
                <td>{tickerCounts[key][1]}</td>
            </tr>
        )
    });

    return(
        <div className={classes.centred}>
            <table>
                <thead className={classes.outline}>
                    <tr>
                        <th>Ticker Symbol</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
            <Button onClick={fetchTickersFromServer} style={{margin: 'auto'}} variant='dark'>Click for analytics</Button>
        </div>
    )
}

export default WSBAnalytics;