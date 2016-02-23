import React from 'react'
import AuthenticatedComponent from './AuthenticatedComponent'

export default AuthenticatedComponent(class Home extends React.Component {

  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  }

  childContextTypes() {
    api_url: React.PropTypes.string.isRequired
  }

  getChildContext() {
    // return { api_url: "http://worldinme.xyz/api/" };
    return { api_url: "http://localhost:3000/api/" };
  }

 updateAuth(isLoggedIn) {
    this.setState({
      loggedIn: !!isLoggedIn
    })
  }

 componentWillMount() {
    console.log('App Mounted')
   auth.onChange = this.updateAuth
   auth.login()
 }

  render() {
   console.log('User Logged In:', this.state.loggedIn)
    return (
      <div>
       <Nav loggedIn={this.state.loggedIn}/>
        {this.props.children || <StoryBoard/>}
        <div className="footer"><hr/><h4>contact</h4></div>

      </div>
    )
  }
})