import React from 'react';
import { connect } from 'react-redux';
// import {pushState} from 'redux-router';
import { browserHistory } from 'react-router'
import { loginUser } from "../state/actions/auth"

export function wrapAuth(Component) {
  class WrappedComponent extends React.Component {

    componentWillMount () {
      this.checkAuth(this.props.isAuthenticated);
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth (isAuthenticated) {
      if (!isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname;
        browserHistory.push(`/login?next=${redirectAfterLogin}`)
      }
    }

    render () {
      return (
        <div>
          {this.props.isAuthenticated === true
            ? <Component {...this.props}/>
            : null
          }
        </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.username,
    loginUser: loginUser
  }
  return connect(mapStateToProps)(WrappedComponent);
}