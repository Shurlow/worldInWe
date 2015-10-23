var React = require('react')
var page = require('page')
var classnames = require('classnames')
var storybox = classnames({'storybox': true})
var textClass = classnames({'text': true})

var StoryBoardItem = React.createClass({

	handleClick: function(i) {
		console.log('clicked: ', i)

		// page('/stories/' + i)
	},

  render: function() {
		// return React.createElement("div", null, React.createElement("h1", null, "Story Board!"), this.state.stories.map(this.makeStoryItem))
    return (
    	<div className={storybox} onClick={this.handleClick.bind(null, this.props.id)}>
    		<img src={this.props.img}></img>
      	<p className={textClass}>{this.props.title}</p>
      	<p className={textClass}> - {this.props.author_name}</p>
      </div>
    )
  }

})

module.exports = StoryBoardItem