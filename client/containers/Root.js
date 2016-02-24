import React from 'react';
import { Provider } from 'react-redux'
import routes from '../routes'
import { Router, Route } from 'react-router'
import Home from '../views/Home'
import About from '../views/About'
import Login from '../views/Login'
import Story from '../views/Story'
import {requireAuthentication} from '../components/requireAuthentication.js';

export default class Root extends React.Component {

  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" component={Home}>
            <Route path="login" component={Login}/>
            <Route path="about" component={About}/>
            <Route path="stories/:id" component={Story}/>
            <Route path="edit/:id" component={Story}/>
          </Route>
        </Router>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: React.PropTypes.object.isRequired
}