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
import Page from './component/page/page.js';
import System from './component/system/system.js';
import CreatePage from './component/createPage/createPage.js';
import App from './App.js';


export default(
    <Switch>      
        <Route exact path='/home' component={Home} />
        <Route path='/home/content' component={Content} />
        <Route path='/home/user' component={User} />
        <Route path='/home/site' component={Site} />
        <Route path='/home/template' component={Template} />
        <Route path='/home/page' component={Page} />
        <Route path='/home/sys' component={System} />
        <Route path='/home/createPage' component={CreatePage} />
        <Route path='/app' component={App} />
    </Switch>
)
