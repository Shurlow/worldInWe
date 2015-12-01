import React from 'react'
import { Link, Redirect } from 'react-router'
var classnames = require('classnames')
// var $ = require('jquery');
// <Link to="/home"><h1>World In Me</h1></Link>
var Nav = React.createClass({

  getInitialState: function() {
    return { clicked: false }
  },

  handleClick: function(e) {
    console.log('click')
    this.setState({
      clicked: !this.state.clicked
    })
  },

  toggleLogin: function(isLoggedIn) {
    if (isLoggedIn) {
      return (
        <Link to='/logout' activeClassName="link-active">logout</Link>
      )
    } else {
      return (
        <Link to='/login' activeClassName="link-active">login</Link>
      )
    }
  },

  render: function() {
    var btnClass = classnames({
      'downclick': this.state.clicked,
    });
    console.log('Nav Props:', this.props)
    return (
      <nav>
        <h1>World In Me</h1>
      	<ul>
          <Link to='/stories' activeClassName="link-active">stories</Link>
		      <Link to='/about' activeClassName="link-active">about</Link>
		      <Link to='/post' activeClassName="link-active">post</Link>
          {this.toggleLogin(this.props.loggedIn)}
	      </ul>
        <hr></hr>
      </nav>
    )
  }

})

module.exports = Nav

// <img src="/img/Logo.svg" onClick={this.handleClick} className={btnClass}></img>