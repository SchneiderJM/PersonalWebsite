import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Navigation/NavigationBar';
import TwitterCloud from './Pages/TwitterCloud/TwitterCloud';
import SubredditClassifier from './Pages/SubredditClassifier/SubredditClassifier';
import WSBAnalytics from './Pages/WSBAnalytics/WSBAnalytics';
import { BrowserRouter, Route } from 'react-router-dom';
import {useEffect} from 'react';

function App() {
  //Sets the website's title
  useEffect(() => document.title = 'Jason\'s Website',[]);
  return (
    <BrowserRouter>
      <Route path='/'>
        <NavigationBar />
      </Route>
      <Route exact path='/'>
        <p>Homepage</p>
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
    </BrowserRouter>
  );
}

export default App;
