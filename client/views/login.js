import React from 'react'
import { browserHistory } from 'react-router'
import { loginUser } from '../actions/auth'
import { connect } from 'react-redux'

class Login extends React.Component {

  constructor(props) {
    super(props);
    // const redirectRoute = this.props.location.query.next || '/';
    this.state = {
      username: '',
      password: '',
      errorText: '',
      admin: false
    };
  }

  componentWillMount() {
    const redirectRoute = this.props.location.query.next || '/';
    if(this.props.isAuthenticated) {
      browserHistory.push(redirectRoute)
    }
  }

  usernameChange(e) {
    const input = e.target.value
    this.setState({
      username: input,
      errorText: ''
    })
  }

  passwordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  adminCheck(e) {
    this.setState({
      admin: !this.state.admin
    })
  }

  login() {
    const { username, password, admin } = this.state
    const userObject = { username: username, password: password, admin: admin }
    const redirect = this.props.location.query.next
    this.props.loginUser(null, userObject, redirect, (err, res) => {
      if (err) { this.setState({errorText: 'Username and/or password do not match'}) }
    });

    // if (this.validateEmail(email)) {
    // } else {
    //   this.setState({
    //     errorText: "Email input is invalid!"
    //   })
    // }
  }

  // navToSignUp() {
  //   browserHistory.push('signup')
  // }

  // validateEmail(email) {
  //   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(email);
  // }

  render() {
    return (
      <article className='login'>
        <div className='card'>
          <h2>Login</h2>
          <span>{this.state.errorText}</span>
          <input placeholder="username" onChange={this.usernameChange.bind(this)}/>
          <input placeholder="password" onChange={this.passwordChange.bind(this)}/>
          <label>
            Admin Account:
            <input type='checkbox' checked={this.state.admin} onChange={this.adminCheck.bind(this)}></input>
          </label>
          <button onClick={this.login.bind(this)}>Login</button>
          <button className='secondary' onClick={() => { browserHistory.push('/signup') }}>Sign Up</button>
        </div>
      </article>
    )
  }

}


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  loginUser
})(Login)


