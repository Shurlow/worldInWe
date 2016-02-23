
import React from 'react';
import {Route, IndexRoute} from 'react-router';
// import {App} from '../containers';
// import {home, login} from '../views';
import home from '../views/home'
import login from '../views/login'

// import {requireAuthentication} from '../components/AuthenticatedComponent';

export default(
  <Route path='/' component={home}>
    <h1>ROUTES</h1>
    <IndexRoute component={home}/>
    <Route path="login" component={login}/>
  </Route>
);