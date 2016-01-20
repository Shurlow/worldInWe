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
        <Link to='/logout' activeClassName="link-active">LOGOUT</Link>
      )
    } else {
      return (
        <Link to='/login' activeClassName="link-active">LOGIN</Link>
      )
    }
  },

  render: function() {
    var btnClass = classnames({
      'downclick': this.state.clicked,
    });
    return (
      <nav>
        <Link to='/stories' activeClassName="link-active">
          <img className="logo" src="/res/logo.svg"></img>
        </Link>
        
        <ul>
          {this.toggleLogin(this.props.loggedIn)}
          <Link to='/post' activeClassName="link-active">NEW</Link>
          <Link to='/about' activeClassName="link-active">ABOUT</Link>          
        </ul>
      </nav>
    )
  }

})

module.exports = Nav

// <Link to='/home'><img className="logo left" src="/img/check.png"></img></Link>
//         <Link to='/post'><img className="logo right" src="/img/edit.png"></img></Link>
// <ul>
//           {this.toggleLogin(this.props.loggedIn)}
//           <Link to='/post' activeClassName="link-active">new</Link>
//           <Link to='/stories' activeClassName="link-active">stories</Link>
//           <Link to='/about' activeClassName="link-active">about</Link>          
//         </ul>
// <img src="/img/Logo.svg" onClick={this.handleClick} className={btnClass}></img>