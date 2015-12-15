import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, Redirect } from 'react-router'
// import { createHistory, useBasename } from 'history'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import classnames from 'classnames'
import auth from './auth'

// const history = useBasename(createHistory)({
//   basename: '/w'
// })

const history = createBrowserHistory()
export default createBrowserHistory()

var StoryBoard = React.createFactory(require('./components/StoryBoard.jsx'))
var Story = React.createFactory(require('./components/Story.jsx'))
// var Editable = React.createFactory(require('./components/Editable.jsx'))
var Post = React.createFactory(require('./components/Post.jsx'))
var PostFile = React.createFactory(require('./components/PostFile.jsx'))
var Nav = React.createFactory(require('./components/Nav.jsx'))
var Home = React.createFactory(require('./components/Home.jsx'))
var About = React.createFactory(require('./components/About.jsx'))
var Login = React.createFactory(require('./components/Login.jsx'))
var Logout = React.createFactory(require('./components/Logout.jsx'))

const App = React.createClass({

	// constructor(props) {
	// 	super(props)
	// 	this.state = { loggedIn: auth.loggedIn() }
	// },

	getInitialState() {
		return { loggedIn: auth.loggedIn() }
	},

	updateAuth(isLoggedIn) {
    this.setState({
      loggedIn: !!isLoggedIn
    })
  },

	componentWillMount() {
		auth.onChange = this.updateAuth
		auth.login()
	},

  render() {
  	console.log('User Logged In:', this.state.loggedIn)
    return (
      <div>
      	<Nav loggedIn={this.state.loggedIn}/>
        {this.props.children}
        <div className="footer"><hr/><h4>contact</h4></div>
      </div>
    )
  }
})

function requireAuth(nextState, replaceState) {
  if (!auth.loggedIn())
    replaceState({ nextPathname: nextState.location.pathname }, '/login')
}

render((
  <Router history={history}>
    <Route path="/" component={App}>
    	<Route path="home" component={Home}/>
    	<Route path="login" component={Login}/>
    	<Route path="logout" component={Logout}/>
      <Route path="about" component={About}/>
      <Route path="stories" component={StoryBoard}/>
      	<Route path="/stories/:id" component={Story}/>

      <Route path="post" component={Post} onEnter={requireAuth}/>
        <Route path="post/file" component={PostFile} onEnter={requireAuth}/>
    </Route>
  </Router>
), document.getElementById('react-app-mount'))

// <Route path="/stories/:id/edit" component={Editable}/>