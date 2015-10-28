var React = require('react')
var request = require('superagent')
var classnames = require('classnames')
var storyMain = classnames({'story': true})

var Post = React.createClass({

  getInitialState: function() {
    return { text: "Paste text here.." }
  },

  handleChange: function(e) {
    console.log(e.target.value)
    this.setState({
      text: e.target.value
    })
  },

  handleClick: function() {
    var self = this
    request
      .post('http://localhost:3000/api/story')
      .send(this.state.text)
      .end(function(err, res) {
        self.setState({
          stories: res.body
        })
      })
  },

  render: function() {
    console.log(this.state)
    return (
    	<div className="post flex-center">
    		<h1>Posy your story.</h1>
          <textarea type="text" value={this.state.text} onChange={this.handleChange} onfocus=""></textarea>
          <div className="button" onClick={this.handleClick}>Post</div>
      </div>
    )
  }

})

module.exports = Post
