// var ReactDOMServer = require('react-dom/server');
// var StoryBoardItem = React.createFactory(require('../client/components/StoryBoardItem'))
var React = require('react');
var request = require('superagent')

var StoryBoard = React.createClass({

	getInitialState: function() {
		return { stories: [] }
	},

	componentDidMount: function() {
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
		return React.createElement("p", null, item.author)
	},

  render: function() {
  	console.log('rendered')
		return React.createElement("div", null, React.createElement("h1", null, "Story Board!"), this.state.stories.map(this.makeStoryItem))
  }

})

// var App = React.createFactory(StoryBoard)
// ReactDOM.render(App({stories: ['hi', 'mom']}), document.getElementById('react-app-mount'))
module.exports = StoryBoard