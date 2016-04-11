import React from 'react';
import {connect} from 'react-redux';
// import {pushState} from 'redux-router';
import { browserHistory } from 'react-router'

// higher order component for authenticated story with specific auth id
export function wrapUserAuth(Component) {
  class AuthenticatedUserComponent extends React.Component {

    componentWillMount () {
      this.checkAuth(this.props.isAuthenticated);
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth (isAuthenticated) {
      if (isAuthenticated && this.props.id === this.props.auth_id) {
        console.log('editing permission granted')
      } else {
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

  return connect(mapStateToProps)(AuthenticatedUserComponent);
}