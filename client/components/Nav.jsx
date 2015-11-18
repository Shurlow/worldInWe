import React from 'react'
import { Link, Redirect } from 'react-router'
// var $ = require('jquery');

var Nav = React.createClass({

  render: function() {
    return (
      <nav>
      	<Link to="/home"><h1>World In Me</h1></Link>
      	<ul>
          <Link to='/stories' activeClassName="link-active">stories</Link>
		      <Link to='/about' activeClassName="link-active">about</Link>
		      <Link to='/post' activeClassName="link-active">post</Link>
	      </ul>
      </nav>
    )
  }

})

module.exports = Nav