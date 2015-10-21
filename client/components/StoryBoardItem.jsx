var React = require('react')
var classnames = require('classnames')
var storybox = classnames({'storybox': true})
var textClass = classnames({'text': true})

var StoryBoardItem = React.createClass({

  render: function() {
		// return React.createElement("div", null, React.createElement("h1", null, "Story Board!"), this.state.stories.map(this.makeStoryItem))
    return (
    	<div className={storybox}>
    		<img src="https://unsplash.it/200?random"></img>
      	<p className={textClass}>{this.props.text}</p>
      </div>
    )
  }

})

module.exports = StoryBoardItem