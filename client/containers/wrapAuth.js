import React from 'react';
import {connect} from 'react-redux';
// import {pushState} from 'redux-router';
import { browserHistory } from 'react-router'

export function wrapAuth(Component) {
  class AuthenticatedComponent extends React.Component {

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

  const mapStateToProps = (state) => ({
    token: state.auth.token,
    id: state.auth.id,
    isAuthenticated: state.auth.isAuthenticated,
    auth_id: state.data.selectedStory.auth_id
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}