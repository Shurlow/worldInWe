import React from 'react'
import { browserHistory } from 'react-router'
import { logoutUser } from '../actions'
import { connect } from 'react-redux'

class Logout extends React.Component {

  componentWillMount() {
    const redirectRoute = this.props.location.query.next || '/';
    if(!this.props.isAuthenticated) {
      browserHistory.push(redirectRoute)
    }
  }

  logout() {
    this.props.logoutUser()
  }

  render() {
    return (
      <article className='login'>
        <div className='card'>
          <h2>Logout</h2>
          <p>Are you sure you want to logout?</p>
          <button onClick={this.logout.bind(this)}>Logout</button>
        </div>
      </article>
    )
  }

}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  logoutUser
})(Logout)


