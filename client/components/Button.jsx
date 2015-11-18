import React from 'react'
import { Link, Redirect } from 'react-router'
// var $ = require('jquery');

var classNames = require('classnames');

var Button = React.createClass({

  getInitialState: function() {
    return {
      isPressed: false,
    }
  },

  handleClick: function(e) {
  	console.log('click dat butt')
  	this.setState({
  		isPressed: !this.state.isPressed
  	})
  },

  render: function() {
    var btnClass = classNames({
      'logo': true,
      'clicked': this.state.isPressed,
    });
    return <img src={this.props.src} onClick={this.handleClick} className={btnClass}></img>;
  }
})

module.exports = Button

