import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

export default function requireUserAuth(Component) {
  class AuthenticatedUserComponent extends React.Component {

    userIsAuthor() {
      const { user_id, isAuthenticated } = this.props
      const author_id = this.props.params.id
      if (isAuthenticated && user_id === author_id) {
        return true
      } else {
        return false
      }
    }

    render () {
      console.log('requireUserAuth', this.props)
      // const { user_id, isAuthenticated } = this.props
      // const author_id = this.props.params.id
      return (
        <div>
          {this.userIsAuthor()
            ? <Component {...this.props}/>
            : null
          }
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.username,
    user_id: state.auth.id
  });

  return connect(mapStateToProps)(AuthenticatedUserComponent);
}