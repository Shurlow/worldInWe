import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, Redirect } from 'react-router'
// import { createHistory, useBasename } from 'history'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import classnames from 'classnames'
import auth from './auth'



const history = createBrowserHistory();

var StoryBoard = require('./components/StoryBoard.jsx')
var Story = require('./components/Story.jsx')
// var Story = wrapUrl(require('./components/Story.jsx'))
// var Editable = React.createFactory(require('./components/Editable.jsx'))
var Post = React.createFactory(require('./components/Post.jsx'))
var PostFile = React.createFactory(require('./components/PostFile.jsx'))
var Nav = React.createFactory(require('./components/Nav.jsx'))
var Home = React.createFactory(require('./components/Home.jsx'))
var About = React.createFactory(require('./components/About.jsx'))
var Login = React.createFactory(require('./components/Login.jsx'))
// var Login = './components/Login.jsx'
var Logout = React.createFactory(require('./components/Logout.jsx'))
// var Overlay = require('./components/Overlay.jsx')



const App = React.createClass({

	// constructor(props, context) {
	// 	super(props, context)
 //    console.log(props, context)
	// 	this.state = { loggedIn: auth.loggedIn() }
	// }

  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  childContextTypes: {
    api_url: React.PropTypes.string.isRequired
  },

  getChildContext() {
    return { api_url: "http://worldinme.xyz/api/" };
    // return { api_url: "http://localhost:3000/api/" };
  },

	updateAuth(isLoggedIn) {
    this.setState({
      loggedIn: !!isLoggedIn
    })
  },

	componentWillMount() {
    console.log('App Mounted')
		auth.onChange = this.updateAuth
		auth.login()
	},

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

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
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
      <Route path="post" component={Post}/>
        <Route path="post/file" component={PostFile}/>
    </Route>
  </Router>
), document.getElementById('react-app-mount'))


// render((
//   <Router history={browserHistory}>
//     <Route path="/" component={App}>
//       <Route path="login" component={Login} />
//       <Route path="logout" component={Logout} />
//       <Route path="about" component={About} />
//       <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
//     </Route>
//   </Router>
// ), document.getElementById('example'))
// <Route path="/stories/:id/edit" component={Editable}/>