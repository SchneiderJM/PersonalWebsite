import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Chart from 'chart.js';
import classes from './WSBAnalytics.module.css'
import Spinner from '../../UI/Spinner/Spinner';

function fetchGraphData(setGraphData, setDataLoaded) {
    axios.get('https://datafetcher-ktoivrtfoa-uc.a.run.app/?queryCode=TopPosts')
        .then(response => {
            setGraphData(response['data'].map(item => [{ 'y': item[0], 'x': item[1] }]).map(item => item[0]));
        }).then(() => setDataLoaded(true));
};

const WSBAnalytics = () => {
    //This sits in the useEffect hook and prevents it from running on the first render
    const firstRun = useRef(true);
    const chartRef = useRef(null);
    const [graphData, setGraphData] = useState([{ 'x': '2010-01-01', 'y': 1 }]);
    const [recentTableData, setRecentTableData] = useState({ 'tickers': [1, 2, 3] });
    const [recentLoaded, setRecentLoaded] = useState(false);
    const [showDescription, setShowDescription] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);

    //const chartCanvas = <canvas ref={chartRef} />
    const chartJSX = dataLoaded ? <canvas ref={chartRef} /> : <Spinner />;

    useEffect(() => fetchGraphData(setGraphData, setDataLoaded), []);

    useEffect(() => {
        axios.get('https://datafetcher-ktoivrtfoa-uc.a.run.app/?queryCode=RecentDataTable')
            .then(response => setRecentTableData(response.data.tickers))
            .then(() => setRecentLoaded(true));
    }, [])
    //Creates the chart when the state is updated
    useEffect(() => {
        if (dataLoaded && !showDescription) {
            //disables linting for the next line because the warning is pretty meaningless
            // eslint-disable-next-line
            const newChart = new Chart(chartRef.current, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Upvoted Posts',
                        data: graphData
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Top 1000 Posts, Upvotes and Date Posted'
                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            distribution: 'linear',
                            scaleLabel: {
                                display: true,
                                labelString: 'Post Date'
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Upvotes'
                            }
                        }]
                    },
                    maintainAspectRatio: false
                }
            })
        } else {
            firstRun.current = false;
        }
    }, [graphData, dataLoaded, showDescription])

    const items = Object.keys(recentTableData).map((key) => {
        return (
            <tr key={key}>
                <td>{recentTableData[key][0]}</td>
                <td>{recentTableData[key][1]}</td>
                <td>{recentTableData[key][2]}</td>
            </tr>
        )
    });


    let page = <div>Internal Logic Error</div>;

    if (showDescription) {
        page = <div className={classes.container}>
            <h1 className={classes.header}>WallStreetBets Analytics</h1>
            <p>Wallstreetbets is a section on the popular social media website, Reddit.</p>
            <p>It rose to prominence in early 2021 when implicated in a huge jump in the stock price of Gamestop.</p>
        </div>
    } else {
        page =
            <>

                {recentLoaded ?
                    <div className={classes.tableContainer}>
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
                        <div className={classes.tableParameters}>
                            <div className={classes.titleInputPair}>
                                <p className={classes.parameterTitle}>Date Range</p>
                                <select name="DateRange" className={classes.parameterSelector}>
                                    <option value='24h'>24 Hours</option>
                                    <option value='1w'>1 Week</option>
                                    <option value='2w'>2 Weeks</option>
                            </select>
                            </div>

                            <div className={classes.titleInputPair}>
                                <p className={classes.parameterTitle}>Max Tickers</p>
                                <input type='text' placeholder='Number of Tickers' />
                            </div>

                            <div className={classes.titleInputPair}>
                                <p></p>
                                <Button variant='dark' className={classes.reloadButton}>Reload Table</Button>
                            </div>
                        </div>
                    </div>

                    : <><Spinner /> <p>Loading Table</p></>}
                <div className={classes.chartContainer}>
                    {chartJSX}
                </div>
            </>
    }

    return (
        <>
            <div className={classes.gridcontainer}>
                {page}
                <div>
                    <Button className={classes.prevButton} variant='dark' onClick={() => setShowDescription(true)}>Prev</Button>
                    <Button className={classes.nextButton} variant='dark' onClick={() => setShowDescription(false)}>Next</Button>
                </div>
            </div>
        </>
    )
}

export default WSBAnalytics;