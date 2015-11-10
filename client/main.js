import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, Redirect } from 'react-router'
import { createHistory, useBasename } from 'history'
import classnames from 'classnames'

const history = useBasename(createHistory)({
  basename: '/w'
})

var StoryBoard = React.createFactory(require('./components/StoryBoard.jsx'))
var Story = React.createFactory(require('./components/Story.jsx'))
var Post = React.createFactory(require('./components/Post.jsx'))
var Nav = React.createFactory(require('./components/Nav.jsx'))
var Home = React.createFactory(require('./components/Home.jsx'))
var About = React.createFactory(require('./components/About.jsx'))

class App extends React.Component {
  render() {
    return (
      <div>
      	<Nav />
        {this.props.children}
      </div>
    )
  }
}

render((
  <Router history={history}>
    <Route path="/" component={App}>
    	<Route path="home" component={Home}/>
      <Route path="about" component={About}/>
      <Route path="stories" component={StoryBoard}/>
      	<Route path="/stories/:id" component={Story}/>
      <Route path="post" component={Post}/>
    </Route>
  </Router>
), document.getElementById('react-app-mount'))