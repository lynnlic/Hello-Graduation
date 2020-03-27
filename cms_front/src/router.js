import React  from 'react';
import {
    Route,
    Switch
}from 'react-router-dom';


import Content from './component/content/content.js';
import Home from './component/homepage/homepage.js';
import User from './component/user/user.js';
import Site from './component/site/site.js';
import Template from './component/template/template.js';
import App from './App.js';


export default(
    <Switch>      
        <Route exact path='/home' component={Home} />
        <Route path='/home/content' component={Content} />
        <Route path='/home/user' component={User} />
        <Route path='/home/site' component={Site} />
        <Route path='/home/template' component={Template} />
        <Route path='/app' component={App} />
    </Switch>
)
