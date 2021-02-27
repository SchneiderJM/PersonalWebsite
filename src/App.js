import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Navigation/NavigationBar';
import TwitterCloud from './Pages/TwitterCloud/TwitterCloud';
import SubredditClassifier from './Pages/SubredditClassifier/SubredditClassifier';
import WSBAnalytics from './Pages/WSBAnalytics/WSBAnalytics';
import Homepage from './Pages/Homepage/Homepage';
import Contact from './Pages/Contact/Contact';
import { BrowserRouter, Route } from 'react-router-dom';
import React, {useEffect} from 'react';
import classes from './App.module.css';
import bg from './Assets/bg.jpg'

function App() {
  //Sets the website's title
  useEffect(() => document.title = 'Jason\'s Website',[]);
  return (
    <div className={classes.Router} style={{backgroundImage:`url(${bg})`}}>
      <BrowserRouter className={classes.Router}>
        <Route path='/'>
          <NavigationBar />
        </Route>
        <Route exact path='/'>
          <Homepage />
        </Route>
        <Route path='/Twitter_Cloud'>
          <TwitterCloud />
        </Route>
        <Route path='/Reddit_Classifier'>
          <SubredditClassifier />
        </Route>
        <Route path='/WSB_Analytics'>
          <WSBAnalytics />
        </Route>
        <Route path='/Contact'>
          <Contact />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
