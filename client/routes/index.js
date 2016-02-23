
import React from 'react';
import {Route, IndexRoute} from 'react-router';
// import {App} from '../containers';
import Home from '../views/Home'
import Login from '../views/Login'

// import {requireAuthentication} from '../components/AuthenticatedComponent';

export default(
  <Route path='/' component={Home}>
    <Route path="login" component={Login}/>
  </Route>
);