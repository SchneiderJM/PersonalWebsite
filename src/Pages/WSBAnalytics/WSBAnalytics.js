import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Chart from 'chart.js';
import classes from './WSBAnalytics.module.css'
import Spinner from '../../UI/Spinner/Spinner';
import {DataSet, Network} from 'vis';

function fetchGraphData(setGraphData, setDataLoaded) {
    axios.get('https://datafetcher-ktoivrtfoa-uc.a.run.app/?queryCode=TopPosts')
        .then(response => {
            setGraphData(response['data'].map(item => [{ 'y': item[0], 'x': item[1] }]).map(item => item[0]));
        }).then(() => setDataLoaded(true));
};

const WSBAnalytics = () => {
    //Network Test
    const nodes = new DataSet([
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' },
        { id: 3, label: 'Node 3' },
        { id: 4, label: 'Node 4' },
        { id: 5, label: 'Node 5' }
      ]);
      
      // create an array with edges
      const edges = new DataSet([
        { from: 1, to: 3 },
        { from: 1, to: 2 },
        { from: 2, to: 4 },
        { from: 2, to: 5 }
      ]);
      
      const networkData = {
        nodes: nodes,
        edges: edges
      };
      const options = {};
    //This sits in the useEffect hook and prevents it from running on the first render
    const firstRun = useRef(true);
    const chartRef = useRef(null);
    const networkRef = useRef();
    const [graphData, setGraphData] = useState([{ 'x': '2010-01-01', 'y': 1 }]);
    const [recentTableData, setRecentTableData] = useState({ 'tickers': [1, 2, 3] });
    const [recentLoaded, setRecentLoaded] = useState(false);
    const [showDescription, setShowDescription] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    //The first one stages changes to the table, the second one executes it
    //I couldn't really think of a better way to do this.
    const [tmpTableDateRange, setTmpTableDateRange] = useState('GenTable24');
    const [tableDateRange, setTableDateRange] = useState('GenTable24');
    const [tableItems, setTableItems] = useState('');

    const chartJSX = dataLoaded ? <canvas ref={chartRef} /> : <Spinner />;

    useEffect(() => fetchGraphData(setGraphData, setDataLoaded), []);

    useEffect(() => {
        setRecentLoaded(false);
        axios.get('https://datafetcher-ktoivrtfoa-uc.a.run.app/?queryCode='+tableDateRange)
            .then(response => setRecentTableData(response.data.tickers))
            .then(() => setRecentLoaded(true));
    }, [tableDateRange]);

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
    useEffect(() => {
        setTableItems(Object.keys(recentTableData).map((key) => {
            return (
                <tr key={key}>
                    <td>{recentTableData[key][0]}</td>
                    <td>{recentTableData[key][1]}</td>
                    <td>{recentTableData[key][2]}</td>
                </tr>
            )
        }));
    },[recentTableData]);


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
                                    <th>Mentions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableItems}
                            </tbody>
                        </table>
                        <div className={classes.tableParameters}>
                            <div className={classes.titleInputPair}>
                                <p className={classes.parameterTitle}>Date Range</p>
                                <select onChange={(text) => setTmpTableDateRange(text.target.value)} 
                                    name="DateRange" 
                                    className={classes.parameterSelector}>
                                    <option value='GenTable24'>1 Day</option>
                                    <option value='GenTable48'>2 Days</option>
                                    <option value='GenTable72'>3 Days</option>
                                    <option value='GenTable96'>4 Days</option>
                                    <option value='GenTable120'>5 Days</option>
                                </select>
                            </div>

                            <div className={classes.titleInputPair}>
                                <p></p>
                                <Button 
                                variant='dark' 
                                className={classes.reloadButton}
                                onClick={() => setTableDateRange(tmpTableDateRange)}
                                >Reload Table</Button>
                            </div>
                        </div>
                    </div>

                    : <><Spinner /> <p>Loading Table</p></>}
                
                <div className={classes.chartContainer}>
                    {chartJSX}
                </div>
            </>
    }







      useEffect(()=>{
          console.log('rendered network')
        const network = new Network(networkRef.current,networkData,options)
      },[networkData,options])


    return (
        <>
            <div className={classes.gridcontainer}>
                {page}
                <div className={showDescription ? classes.networkContainerNull : classes.networkContainer} ref={networkRef}></div>
                <div>
                    <Button className={classes.prevButton} variant='dark' onClick={() => setShowDescription(true)}>Prev</Button>
                    <Button className={classes.nextButton} variant='dark' onClick={() => setShowDescription(false)}>Next</Button>
                </div>
            </div>
        </>
    )
}

export default WSBAnalytics;