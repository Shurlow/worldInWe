import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, Redirect } from 'react-router'
import { createHistory, useBasename } from 'history'

const history = useBasename(createHistory)({
  basename: '/worldInMe'
})

class App extends React.Component {
  render() {
    return (
      <div className='content'>
      	<Nav />
        {this.props.children}
      </div>
    )
  }
}

class Nav extends React.Component {
  render() {
    return (
      <div className="nav">
      	<h1 className="title" >World In Me</h1>
      	<div className="navlinks">
		      <Link to='/about'>about</Link>
		      <Link to='/stories'>stories</Link>
		      <Link to='/about'>write</Link>
		    </div>
        {this.props.children}
      </div>
    )
  }
}

class About extends React.Component {
  render() {
    return (
      <div className="about">
      	<h2>About</h2>
      </div>
    )
  }
}

var StoryBoard = React.createFactory(require('./components/StoryBoard.jsx'))
var Story = React.createFactory(require('./components/Story.jsx'))

render((
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="stories" component={StoryBoard}/>
      <Route path="/stories/:id" component={Story}/>
    </Route>
  </Router>
), document.getElementById('react-app-mount'))