import React from 'react'
import { History } from 'react-router'
import auth from '../auth.js'

const Login = React.createClass({

  mixins: [History],

  getInitialState: function() {
    return { featured: [] }
  },

  handleSubmit: function(e) {
    var self = this
    e.preventDefault()

    var email = self.refs.email.value
    var pass = self.refs.pass.value
    auth.login(email, pass, function(loggedIn) {
      if (!loggedIn)
        return console.log('Bad login')

      const { location } = self.props

      if (location.state && location.state.nextPathname) {
        self.history.replaceState(null, location.state.nextPathname)
      } else {
        self.history.replaceState(null, '/')
      }

    })

  },

  render() {
    return (
      <div className="login">

        <div>
          <h2>Log In</h2>
          <form onSubmit={this.handleSubmit}>
            <input ref="email" placeholder="email" defaultValue="joe@example.com"></input>
            <input ref="pass" placeholder="pass" defaultValue="password"></input>
            <button type="submit">login</button>
          </form>
        </div>
        <div>
          <h2>Sign Up</h2>
          <form onSubmit={this.handleSubmit}>
          <input ref="email" placeholder="email" defaultValue="joe@example.com"></input>
          </form>
        </div>
        <p>Having issues? <a>contact us</a> </p>
      </div>
    )
  }

})

export default Login
