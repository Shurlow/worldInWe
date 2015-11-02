import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, Redirect } from 'react-router'
import { createHistory, useBasename } from 'history'

const history = useBasename(createHistory)({
  basename: '/w'
})

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

class Nav extends React.Component {
  render() {
    return (
      <nav>
      	<h1>World In Me</h1>
      	<ul>
		      <li><Link to='/about'>about</Link></li>
		      <li><Link to='/stories'>stories</Link></li>
		      <li><Link to='/post'>post</Link></li>
	      </ul>
      </nav>

    )
  }
}

class About extends React.Component {
  render() {
    return (
      <div className="content">
      	<h2>About Us</h2>
      	<p>Eos ex esse oporteat, ad mel alii patrioque. Sit sonet albucius pertinacia ne, veri mazim periculis mea an. Vim ipsum timeam philosophia ea, cu tale paulo mel. Senserit temporibus complectitur te sed, ad mea altera mnesarchum comprehensam, cu nec impetus perpetua. Mei tota pericula necessitatibus cu, ea harum mucius malorum sea, ea usu novum corpora deterruisset.</p>
      </div>
    )
  }
}

var StoryBoard = React.createFactory(require('./components/StoryBoard.jsx'))
var Story = React.createFactory(require('./components/Story.jsx'))
var Post = React.createFactory(require('./components/Post.jsx'))
var Home = React.createFactory(require('./components/Video.jsx'))

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