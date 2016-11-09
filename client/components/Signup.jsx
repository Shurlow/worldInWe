import React from 'react'
// import { browserHistory } from 'react-router'
import { guid } from '../util'
import { randomBgImg } from '../util'
const pickedImg = randomBgImg()

export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      username: null,
      password: null,
      isAdmin: false,
      accessCode: null,
    };
  }

  emailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  usernameChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  passwordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  passwordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  toggleAdmin() {
    this.setState({
      isAdmin: !this.state.isAdmin
    })
  }

  accessCodeChange(e) {
    this.setState({
      accessCode: e.target.value
    })
  }


  signUp(e) {
    e.preventDefault()
    const { username, password, email, isAdmin, accessCode } = this.state
    const userObject = {
      id: guid(),
      username: username,
      email: email,
      password: password,
      accessCode: isAdmin ? accessCode : null
    }
    console.log('Signing up:', userObject)
    this.props.signUpUser(userObject, '/');  
  }

  render() {
    return (
      <div className='page login'>
        <div className='content' style={{backgroundImage: `url(${pickedImg})`}}>
          <article>
            <form action='' className='small-card center' onSubmit={this.signUp.bind(this)}>
              <h2>Sign Up!</h2>
              <span className='message'>Sign up to post stories.</span>
              <input placeholder="email" type='email' required={true} onChange={this.emailChange.bind(this)}/>
              <input placeholder="username" required={true} onChange={this.usernameChange.bind(this)}/>
              <input placeholder="password" type='password' required={true} onChange={this.passwordChange.bind(this)}/>
              <label>
                Are you an Admin?
                <input type='checkbox' checked={this.state.isAdmin} onChange={this.toggleAdmin.bind(this)}></input>
              </label>
              {this.state.isAdmin
                ? <input placeholder="Access Code" onChange={this.accessCodeChange.bind(this)}/>
                : null
              }
              <div className='button-group'>
                <button className='primary' type='submit'>Sign Up</button>
              </div>
            </form>
          </article>
        </div>
      </div>
    )
  }
}