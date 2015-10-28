// var ReactDOMServer = require('react-dom/server');
var React = require('react')
var request = require('superagent')
var classnames = require('classnames')
var StoryBoardItem = React.createFactory(require('./StoryBoardItem.jsx'))

var boardClass = classnames({'board': true})
var headClass = classnames({'head': true})
var barClass = classnames({'bar': true})
var medTextClass = classnames({'medText': true})

var StoryBoard = React.createClass({

	getInitialState: function() {
		return { stories: [] }
	},

	componentDidMount: function() {
		var self = this
		request
			.get('http://localhost:3000/api')
			.set('Content-Type', 'application/json')
			.end(function(err, res) {
				self.setState({
					stories: res.body
				})
			})
	},

	makeStoryItem: function(item) {
		return StoryBoardItem(item)
	},

  render: function() {
    return (
    	<div className={boardClass}>
				{this.state.stories.map(this.makeStoryItem)}
	    </div>
    )
  }

})

module.exports = StoryBoard