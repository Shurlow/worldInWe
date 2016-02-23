import React from 'react'
// import { browserHistory } from 'react-router'
// import auth from '../auth.js'
// import FacebookButton from "./FacebookButton.jsx"

class Login extends React.Component {

  render() {
    return (
      <div className="login story">
        <div>
          <div>
            <h2>Log In</h2>
            <form onSubmit={this.login.bind(this)}>
              <input type="text" ref={(c) => this.userref = c} placeholder="Username"></input>
              <input type="text" ref={(c) => this.passref = c} placeholder="Password"></input>
              <button type="submit">login</button>
            </form>
          </div>
          <div>
            <h2>Sign Up</h2>
            <form onSubmit={this.login.bind(this)}>
            <input ref="email" placeholder="email" defaultValue="email"></input>
            </form>
          </div>
          <p>Having issues? <a>contact us</a> </p>
        </div>
      </div>
    )
  }

}


export default Login
