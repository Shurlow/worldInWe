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
		console.log('mounted')
		var self = this
		request
			.get('http://localhost:3000/stories')
			.set('Content-Type', 'application/json')
			.end(function(err, res) {
				self.setState({
					stories: res.body
				})
			})
	},

	makeStoryItem: function(item) {
		return StoryBoardItem(item)
		// return (
		// 	<div onClick={this.handleClick(this)}>
		// 		{StoryBoardItem(item)}
		// 	</div>
		// )
		// return StoryBoardItem({img: item.img, title: item.title, author: item.author_name})
	},

  render: function() {
    return (
    	<div>
    		<div className={headClass}>
    			<img id='logo' src={'img/smallLogo.png'}></img>
    			<a href="/stories">stories</a>
					<a href="/about">about</a>
    			<a href="/write">write</a>
    		</div>
    		<p className={medTextClass}>Sed dicit reprimique voluptatibus id, et usu soluta epicuri democritum. Putant quaeque habemus pri te. Vim te probo sadipscing eloquentiam, primis mollis ius ad. An sale congue mandamus nec. Scaevola probatus eam in, mei noluisse mandamus eu.</p>
    		<div className={barClass}></div>
	    	<div className={boardClass}>
				  	{this.state.stories.map(this.makeStoryItem)}
	    	</div>
	    </div>
    )
  }

})

module.exports = StoryBoard