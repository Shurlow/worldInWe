'use strict';

import React from 'react';
import LoginStore from '../stores/LoginStore'
import { Route, RouteHandler, Link } from 'react-router';
// import AuthService from '../services/AuthService'

export default class AuthenticatedApp extends React.Component {
  constructor() {
    super()
    this.state = this._getLoginState();
  }

  _getLoginState() {
    return {
      userLoggedIn: LoginStore.isLoggedIn()
    };
  }

  componentDidMount() {
    this.changeListener = this._onChange.bind(this);
    LoginStore.addChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState(this._getLoginState());
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.changeListener);
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">React Flux app with JWT authentication</a>
          </div>
          {this.headerItems}
        </nav>
        <RouteHandler/>
      </div>
    );
  }

  logout(e) {
    e.preventDefault();
    // AuthService.logout();
  }

}