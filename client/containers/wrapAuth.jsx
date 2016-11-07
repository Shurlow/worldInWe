import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { loginUser, logoutUser, signUpUser } from "../state/actions/auth"

export default function wrapAuth(Component) {
  class WrappedComponent extends React.Component {
    render() {
      return <Component {...this.props}/>
    }
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.username,
    token: state.auth.token
  })
  return connect(mapStateToProps, {
    loginUser,
    logoutUser,
    signUpUser
  })(WrappedComponent)
}