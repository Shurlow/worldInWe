var React = require('react')
var classnames = require('classnames')
var storybox = classnames({'storybox': true})
var textClass = classnames({'text': true})
import { Router, Route, Link, RouteHandler } from 'react-router'

var StoryBoardItem = React.createClass({

  render: function() {
    return (
      <li>
        <Link to={'/stories/'+this.props.id}>
          <div className="textover">
            <h3>{this.props.title}<br/> - {this.props.author_name}</h3>
          </div>
		  		<img src={this.props.img}></img>
        </Link>
      </li>
    )
  }
})

module.exports = StoryBoardItem