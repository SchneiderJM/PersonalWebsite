import React, {useState,useRef, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import Chart from 'chart.js';
import classes from './WSBAnalytics.module.css'

const WSBAnalytics = () => {
    const chartRef = useRef(null);
    const [graphData,setGraphData] = useState([{'x':'2010-01-01','y':1}]);

    //Creates the chart when the state is updated
    useEffect(() => {
        console.log(graphData);
        //disables linting for the next line because the warning is pretty meaningless
        // eslint-disable-next-line
        const newChart = new Chart(chartRef.current,{
            type:'scatter',
            data:{
                datasets: [{
                    label: 'Upvoted Posts',
                    data: graphData
                }]
            },
            options:{
                scales:{
                    xAxes:[{
                        type: 'time',
                        distribution: 'linear',
                        scaleLabel:{
                            display: true,
                            labelString: 'Post Date'
                        }
                    }],
                    yAxes:[{
                        scaleLabel:{
                            display: true,
                            labelString: 'Upvotes'
                        }
                    }]
                }
            }
        })
    },[graphData])

    function fetchGraphData(){
        axios.get('https://datafetcher-ktoivrtfoa-uc.a.run.app')
        .then(response => {
            /*setGraphData({
                'y': response['data'].map(item => item[0]),
                'x': response['data'].map(item => item[1])
            });*/
            setGraphData(response['data'].map(item => [{'y':item[0],'x':item[1]}]).map(item => item[0]));
        });
    };


    return(
        <>
        <div>Out</div>
        <div className={classes.chartContainer}>
            <canvas ref={chartRef} />
        </div>
        <Button onClick={fetchGraphData} />
        </>
    )
}

    //This all may be useful at some point in how to build a table using data pulled from a server
    //but I'm commenting it out for now.
    /*
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
                <td>{tickerCounts[key][2]}</td>
            </tr>
        )
    });

    return(
        <div className={classes.centred}>
            <table>
                <thead className={classes.outline}>
                    <tr>
                        <th>Ticker Symbol</th>
                        <th>Stock Name</th>
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
}*/

export default WSBAnalytics;