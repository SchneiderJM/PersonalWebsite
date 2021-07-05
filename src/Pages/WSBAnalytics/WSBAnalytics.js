import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Chart from 'chart.js';
import classes from './WSBAnalytics.module.css'
import Spinner from '../../UI/Spinner/Spinner';
import {DataSet, Network} from 'vis';

function fetchGraphData(setGraphData, setDataLoaded) {
    axios.get('https://storage.googleapis.com/jasonswebsite_cached_data/top_posts.json')
        .then(response => {
            setGraphData(response['data'].map(item => [{ 'y': item[0], 'x': item[1] }]).map(item => item[0]));
        }).then(() => setDataLoaded(true));
};

function fetchForecastResponse(setForecastResponse, setForecastResponseLoaded,setForecastGraphData,setTopTickers,setSelectedTicker){
    axios.get('https://storage.googleapis.com/jasonswebsite_cached_data/ticker_graph_data.json')
        .then(response => {
            setForecastResponse(response);
            setTopTickers(Object.keys(response['data']));
            setSelectedTicker(Object.keys(response['data'])[0]);
            setForecastGraphData({
                'historical': response['data'][Object.keys(response['data'])[0]]['historical'].map(item => [{ 'x': item[0], 'y': item[1] }]).map(item => item[0]),
                'prediction': response['data'][Object.keys(response['data'])[0]]['prediction'].map(item => [{ 'x': item[0], 'y': item[1] }]).map(item => item[0])})
        }).then(() => setForecastResponseLoaded(true));
}

function setNewForecast(forecastResponse, setForecastGraphData, ticker){
    setForecastGraphData({
        'historical': forecastResponse['data'][ticker]['historical'].map(item => [{ 'x': item[0], 'y': item[1] }]).map(item => item[0]),
        'prediction': forecastResponse['data'][ticker]['prediction'].map(item => [{ 'x': item[0], 'y': item[1] }]).map(item => item[0])
    });
}

const WSBAnalytics = () => {
    
    //This sits in the useEffect hook and prevents it from running on the first render
    const firstRun = useRef(true);
    const chartRef = useRef(null);
    const forecastChartRef = useRef(null);
    const networkRef = useRef();
    const [graphData, setGraphData] = useState([{ 'x': '2010-01-01', 'y': 1 }]);
    //Holds the entire response  containing the forecasts
    const [forecastResponse, setForecastResponse] = useState([{'x':'2010-01-01','y':1}]);
    //Holds the data currently displayed on the forecast graph
    const [forecastGraphData, setForecastGraphData] = useState([{'x':'2010-01-01','y':1}]);
    const [recentTableData, setRecentTableData] = useState({ 'tickers': [1, 2, 3, 4] });
    const [recentLoaded, setRecentLoaded] = useState(false);
    const [showDescription, setShowDescription] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [forecastResponseLoaded, setForecastResponseLoaded] = useState(false);
    const [topTickers, setTopTickers] = useState(['sample1','sample2']);
    const [selectedTicker, setSelectedTicker] = useState('sample1');
    //This determines whether the forecast chart needs to be updated or created
    const [forecastChartExists, setForecastChartExists] = useState(false);
    //The first one stages changes to the table, the second one executes it
    //I couldn't really think of a better way to do this.
    const [tmpTableDateRange, setTmpTableDateRange] = useState('24');
    const [tableDateRange, setTableDateRange] = useState('24');
    const [tableItems, setTableItems] = useState('');


    //Sets up a state for the network
    const [networkData, setNetworkData] = useState(() => {
        //Sample edges
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
        return({data:networkData,options:options})
    });


    const chartJSX = dataLoaded ? 
    <div className={classes.chartContainer} key='chart'>
        <canvas ref={chartRef} /> 
    </div>      
    : 
    <div className={classes.chartContainer}>
        <Spinner key='chartspinner' />
    </div>

    const forecastChartJSX = forecastResponseLoaded ? 
    <div className={classes.chartContainer} key='forecastchart'>
        <div className={classes.chartWithParametersContainer}>
            <canvas ref={forecastChartRef} id='forecastChart' /> 
        </div>
        <div className={classes.tableParameters}>
            <div className={classes.titleInputPair}>
                <p className={classes.parameterTitle}>Stock Ticker</p>
                <select className={classes.parameterSelector}
                        onChange={(text) => setSelectedTicker(text.target.value)}>
                    {topTickers.map((ticker) => <option value={ticker} key={ticker} >{ticker.toUpperCase()}</option>)}
                </select>
            </div>

            <div className={classes.titleInputPair}>
                <p></p>
                <Button 
                variant='dark' 
                className={classes.reloadButton}
                onClick={() => {setNewForecast(forecastResponse, setForecastGraphData, selectedTicker)}}
                >Reload Chart</Button>
            </div>
        </div>
    </div>
    
    : 
    <div className={classes.chartContainer}>
        <Spinner key='forecastchartspinner' />
    </div>

    //Fetches data for the graph
    useEffect(() => fetchGraphData(setGraphData, setDataLoaded), []);
    useEffect(() => fetchForecastResponse(setForecastResponse, setForecastResponseLoaded, setForecastGraphData, setTopTickers,setSelectedTicker), []);
    
    //Fetches data for the network diagram
    useEffect(() => {
        axios.get('https://storage.googleapis.com/networkdata/network_data.json')
            .then(response => {
                const loadedNodes = new DataSet(response['data']['nodes']);
                const loadedEdges = new DataSet(response['data']['edges']);
                setNetworkData({
                    data:{nodes: loadedNodes, edges: loadedEdges},
                    options:{physics:false,interaction:{zoomView:false}}})});
    },[]);

    useEffect(() => {
        setRecentLoaded(false);
        axios.get('https://storage.googleapis.com/jasonswebsite_cached_data/'+tableDateRange+'hourstable.json')
            .then(response => setRecentTableData(response.data.tickers))
            .then(() => setRecentLoaded(true));
    }, [tableDateRange]);

    //Creates the chart when the state is updated
    useEffect(() => {
        if (dataLoaded && !showDescription) {
            //disables linting for the next line because the warning is pretty meaningless
            // eslint-disable-next-line
            const topPostsChart = new Chart(chartRef.current, {
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

    //Creates the forecast chart when the state is updated
    useEffect(() => {
        if (forecastResponseLoaded && !showDescription && !forecastChartExists) {
            setForecastChartExists(true);
            //disables linting for the next line because the warning is pretty meaningless
            // eslint-disable-next-line
            const historicalMentionsChart = new Chart(forecastChartRef.current, {
                type: 'line',
                data: {
                    datasets: [{
                        borderColor: '#6699cc',
                        label: 'Historical Mentions',
                        data: forecastGraphData['historical']
                    },
                    {
                        borderColor: '#cccc99',
                        label: 'Predicted Mentions',
                        data: forecastGraphData['prediction']
                    }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Stock Mentions over the Last Month with ARIMA Forecast'
                    },
                    legend: {
                        display: true
                    },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            distribution: 'linear',
                            scaleLabel: {
                                display: true,
                                labelString: 'Date'
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Mentions'
                            }
                        }]
                    },
                    maintainAspectRatio: false
                }
            })
            //Handles the case where the forecast chart already exists and updates it
        } else if (forecastChartExists){
            //Loops over all of the charts looking for the forecast chart
            Chart.helpers.each(Chart.instances, (instance) => {
                if (instance.chart.canvas.id === 'forecastChart'){
                    instance.data.datasets = [{
                        borderColor: '#6699cc',
                        label: 'Historical Mentions',
                        data: forecastGraphData['historical']
                    },
                    {
                        borderColor: '#cccc99',
                        label: 'Predicted Mentions',
                        data: forecastGraphData['prediction']
                    }
                    ]
                    instance.update()
                }
            })
        } else {
            firstRun.current = false;
        }
    }, [forecastGraphData, forecastResponseLoaded, forecastChartExists, showDescription])

    useEffect(() => {
        setTableItems(Object.keys(recentTableData).map((key) => {
            return (
                <tr key={key}>
                    <td>{recentTableData[key][0]}</td>
                    <td>{recentTableData[key][1]}</td>
                    <td>{recentTableData[key][2]}</td>
                    <td>{recentTableData[key][3].toFixed(4)}</td>
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
            [
                recentLoaded ?
                    <div className={classes.tableContainer} key='table'>
                        <table>
                            <thead className={classes.outline}>
                                <tr>
                                    <th>Ticker Symbol</th>
                                    <th>Stock Name</th>
                                    <th>Mentions</th>
                                    <th>Sentiment</th>
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
                                    value={tmpTableDateRange}
                                    name="DateRange" 
                                    className={classes.parameterSelector}>
                                    <option value='24'>1 Day</option>
                                    <option value='48'>2 Days</option>
                                    <option value='72'>3 Days</option>
                                    <option value='96'>4 Days</option>
                                    <option value='120'>5 Days</option>
                                </select>
                            </div>

                            <div className={classes.titleInputPair}>
                                <p></p>
                                <Button 
                                variant='dark' 
                                className={classes.reloadButton}
                                onClick={() => {setTableDateRange(tmpTableDateRange)}}
                                >Reload Table</Button>
                            </div>
                        </div>
                    </div>

                    : <><Spinner /> <p>Loading Table</p></>,
                
                forecastChartJSX,

                chartJSX

            ]
    }



      /* eslint-disable no-unused-vars */
      useEffect(()=>{
          const network = new Network(networkRef.current,networkData['data'],networkData['options']);
          network.moveTo({scale:0.3});
      },[networkData])
      /* eslint-enable no-unused-vars */

    return (
        <>
            <div className={classes.gridcontainer}>
                {page}
                <div className={classes.networkCard}>
                    {showDescription ? null : <h1 className={classes.networkHeader}>Stock Associations</h1>}
                    {showDescription ? null : <p className={classes.networkDescription}>
                        This network visualizes which stocks are mentioned together more often. 
                        Thicker lines indicate more co-occurences within the same post, title, or comment.
                        The network is interactive, it can be moved around within its container and each node can be moved individually as well.</p>}
                    <div className={showDescription ? classes.networkContainerNull : classes.networkContainer} ref={networkRef}></div>
                </div>
                <div>
                    <Button className={classes.prevButton} variant='dark' onClick={() => setShowDescription(true)}>Prev</Button>
                    <Button className={classes.nextButton} variant='dark' onClick={() => setShowDescription(false)}>Next</Button>
                </div>
            </div>
        </>
    )
}

export default WSBAnalytics;