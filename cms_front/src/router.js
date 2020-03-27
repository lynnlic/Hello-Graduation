import React  from 'react';
import {
    Route,
    Switch
}from 'react-router-dom';


import Content from './component/content/content.js';
import Home from './component/homepage/homepage.js';
import App from './App.js';


export default(
    <Switch>      
        <Route exact path='/home' component={Home} />
        <Route path='/home/content' component={Content} />
        <Route path='/app' component={App} />
    </Switch>
)
