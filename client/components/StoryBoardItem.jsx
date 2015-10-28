var React = require('react')
var classnames = require('classnames')
var storybox = classnames({'storybox': true})
var textClass = classnames({'text': true})
import { Router, Route, Link, RouteHandler } from 'react-router'

var StoryBoardItem = React.createClass({

  render: function() {
    return (
    	<Link to={'/stories/'+this.props.id}>
    	<div className={storybox}>
		  		<img src={this.props.img}></img>
		    	<p className={textClass}>{this.props.title}</p>
		    	<p className={textClass}> - {this.props.author_name}</p>
      </div>
      </Link>
    )
  }

})

module.exports = StoryBoardItem