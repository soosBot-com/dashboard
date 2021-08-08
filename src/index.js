import React from 'react';
import ReactDOM from 'react-dom';

import './style/index.css'

import App from './App'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
function Main () {
    return(
        <Router>
        <Switch>
          <Route path="/">
          <App/>
          </Route>
        </Switch>
        </Router>
    )
}
ReactDOM.render(<Main />, document.getElementById('root'));