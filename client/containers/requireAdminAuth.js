import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import ErrorPage from '../components/ErrorPage'

export default function requireAdminAuth(Component) {
  class AuthenticatedAdminComponent extends React.Component {

    render () {
      const { isAuthenticated, privileges } = this.props
      console.log('requiring admin', privileges)
      return (
        <div>
          { privileges === 'admin'
            ? <Component {...this.props}/>
            : <ErrorPage 
                code={404}
                message={`You do not have sufficient privileges to submit featured stories.`}
              />
          }
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.username,
    privileges: state.auth.privileges,
    user_id: state.auth.id
  });

  return connect(mapStateToProps)(AuthenticatedAdminComponent);
}