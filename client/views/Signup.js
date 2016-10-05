import React from 'react'
// import { browserHistory } from 'react-router'
import { guid } from '../util'
import { signUpUser } from '../actions'
import { connect } from 'react-redux'
import classnames from 'classnames'

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      error: '',
    };
  }

  emailChange(e) {
    const input = e.target.value
    this.setState({
      email: input,
      error: ''
    })
  }

  usernameChange(e) {
    const input = e.target.value
    this.setState({
      username: input
    })
  }

  passwordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  signUp() {
    const { username, password, email } = this.state
    const userObject = {
      id: guid(),
      username: username,
      email: email,
      password: password
    }
    if (this.validateEmail(this.state.email)) {
      this.props.signUpUser(userObject, '/');      
    } else {
      this.setState({
        error: "Email input is invalid!"
      })
    }

  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render() {
    return (
      <article className='login'>
        <div className='card'>
          <h2>Sign Up!</h2>
          <span>Sign up to post stories.</span>
          <span>{this.state.error}</span>
          <input placeholder="email" onChange={this.emailChange.bind(this)}/>
          <input placeholder="username" onChange={this.usernameChange.bind(this)}/>
          <input placeholder="password" onChange={this.passwordChange.bind(this)}/>
          <button onClick={this.signUp.bind(this)}>Sign Up</button>
        </div>
      </article>
    )
  }

}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAuthenticating: state.auth.isAuthenticating,
  error: state.auth.error
});

export default connect(mapStateToProps, {
  signUpUser
})(SignUp)


