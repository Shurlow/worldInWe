import React from 'react'
import { Link, Redirect } from 'react-router'
import { connect } from 'react-redux'
import { logoutUser } from "../actions"
import FlatButton from 'material-ui/lib/flat-button';

class Nav extends React.Component {

  makeLoginButton() {
    if (this.props.isAuthenticated) {
      return (
        <FlatButton label="LOGOUT" onClick={this.logout.bind(this)}/>
      )
    } else {
      return (
        <Link to="/login">
          <FlatButton label="LOGIN"/>
        </Link>
      )
    }
  }

  logout() {
    this.props.logoutUser()
  }

  render() {
    console.log(this.props)
    return (
      <nav>
        <Link to='/' activeClassName="link-active">
          <img className="logo" src="/res/logo.svg"></img>
        </Link>
        <ul>
          <Link to="/new">
            <FlatButton label="NEW"/>
          </Link>
          <Link to="/about">
            <FlatButton label="ABOUT"/>
          </Link>
          {this.makeLoginButton()}
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  logoutUser
})(Nav)