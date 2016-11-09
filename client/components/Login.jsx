import React from 'react'
import { browserHistory } from 'react-router'
import classnames from 'classnames'
import { Link } from 'react-router'
import { randomBgImg } from '../util'
const pickedImg = randomBgImg()

export default class Login extends React.Component {

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

  login(e) {
    e.preventDefault()
    const { username, password, admin } = this.state
    const userObject = { username: username, password: password, admin: admin }
    const redirect = this.props.location.query.next
    this.props.loginUser(null, userObject, redirect, (err, res) => {
      if (err) { this.setState({errorText: 'Username and/or password do not match'}) }
    });
  }

  render() {
    const { admin, errorText } = this.state
    return (
      <div className='page login'>
        <div className='content' style={{backgroundImage: `url(${pickedImg})`}}>
          <article>
            <form action='' className='small-card center' onSubmit={this.login.bind(this)}>
              <h2>Login</h2>
              {errorText ? <span className='message error'>{errorText}</span> : null}
              <input placeholder="username" onChange={this.usernameChange.bind(this)}/>
              <input placeholder="password" onChange={this.passwordChange.bind(this)}/>
              <label>
                Admin Account: 
                <input type='checkbox' checked={admin} onChange={this.adminCheck.bind(this)}></input>
              </label>
              <div className='button-group'>
                <button className='primary' type='submit'>Login</button>
                <Link to='/signup' className='button secondary'>sign up</Link>
              </div>
            </form>
          </article>
        </div>
      </div>
    )
  }

}