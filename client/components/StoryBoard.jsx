// var ReactDOMServer = require('react-dom/server');
var React = require('react')
var request = require('superagent')
var classnames = require('classnames')
var StoryBoardItem = React.createFactory(require('./StoryBoardItem.jsx'))

var boardClass = classnames({'board': true})

var StoryBoard = React.createClass({

	getInitialState: function() {
		return { stories: [] }
	},

	componentDidMount: function() {
		console.log('mounted')
		var self = this
		request
			.get('http://localhost:3000/stories')
			.set('Content-Type', 'application/json')
			.end(function(err, res) {
				console.log(res.body)
				self.setState({
					stories: res.body
				})
			})
	},

	makeStoryItem: function(item) {
		// return (<p>{item.text}</p>)
		return StoryBoardItem({text: item.text})
	},

  render: function() {
    return (
    	<div>
	    	<h1>Story Board!</h1>
	    	<div className={boardClass}>
				  	{this.state.stories.map(this.makeStoryItem)}
	    	</div>
	    </div>
    )
  }

})

module.exports = StoryBoard