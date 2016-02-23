import React from 'react'
import Nav from './Nav.jsx'
import StoryBoard from './Storyboard.jsx'

export default class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
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
   // auth.onChange = this.updateAuth
   // auth.login()
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
}