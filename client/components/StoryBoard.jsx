// var ReactDOMServer = require('react-dom/server');
// var StoryBoardItem = React.createFactory(require('../client/components/StoryBoardItem'))
var React = require('react')
var request = require('superagent')

var StoryBoard = React.createClass({

	getInitialState: function() {
		return {
			stories: [],
		}
	},

	componentDidMount: function() {
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
		return (<p>{item.text}</p>)
	},

  render: function() {
    return (
    	<div>
    		<h1>Story Board!</h1>
			  	{this.state.stories.map(this.makeStoryItem)}
    	</div>
    )
  }

})

module.exports = StoryBoard