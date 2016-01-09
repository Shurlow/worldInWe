import React from 'react'
import { browserHistory } from 'react-router'
import auth from '../auth.js'

class Login extends React.Component {

  constructor(props, context) {
    console.log('cx:', props.route.compnent.contextTypes.router, props)
    super(props, context)
    context.router
    this.state = {
      user: '',
      pass: '',
      admin: false,
      editor: false
    }
  }


  
  // mixins: [History]

  login(e) {
    e.preventDefault()
    var self = this

    var email = self.userref.value
    var pass = self.passref.value
    auth.login(email, pass, function(loggedIn) {
      if (!loggedIn)
        return console.log('Bad login')

      const { location } = self.props

      if (location.state && location.state.nextPathname) {
        console.log('something', self)
        self.context.router.replace(location.state.nextPathname)
        // self.history.replaceState(null, location.state.nextPathname)
      } else {
        // self.history.replaceState(null, '/')
        console.log('else', self)
        self.context.router.replace('/')
      }

    })

  }

  render() {
    return (
      <div className="login">
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

Login.contextTypes = {
  router: React.PropTypes.func.isRequired
}

export default Login
