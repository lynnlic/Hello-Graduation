import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
}from 'react-router-dom';

import Login from './component/login/login.js';
import Home from './component/homepage/homepage.js';
import AuthRouter from './AutoRouter.js';

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <AuthRouter  path="/home" component={ Home } />
      </Switch>
    </div>
  </Router>
  ,
  document.getElementById('root')
);
