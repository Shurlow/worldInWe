// var React = require('react')
// var ReactDOMServer = require('react-dom/server');
// var StoryBoardItem = React.createFactory(require('StoryBoardItem'))
// var request = require('superagent')
var mount = document.getElementById('react-app-mount')

var StoryBoard = React.createClass({

	getInitialState: function() {
		console.log(this.props)
		return {
			stories: this.props.stories,
		}
	},

	// componentDidMount: function() {
	// 	request
	// 		.get('http://localhost:3000/stories')
	// 		.set('Content-Type', 'application/json')
	// 		.end(function(err, res) {
	// 			console.log(res.body)
	// 			self.setState({
	// 				stories: res.body
	// 			})
	// 		})
	// }

	makeStoryItem: function(item) {
		// return (<StoryBoardItem text={item.text} />)
		return StoryBoardItem({ text: item.text })
	},

  render: function() {
    return (
    		<h1>Story Board!</h1>
			  // {this.state.stories.map(makeStoryItem)}
    )
  }

})

React.render(<StoryBoard text='here is some text'/>, mount)