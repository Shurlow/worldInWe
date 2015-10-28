var React = require('react')
var request = require('superagent')
var classnames = require('classnames')
var storyMain = classnames({'story': true})

var Story = React.createClass({

  getInitialState: function() {
    return { text: "yoyo" }
  },

  componentDidMount: function() {
    var self = this
    request
      .get('http://localhost:3000/api/' + this.props.params.id)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        console.log(err)
        self.setState({
          text: res.body.text
        })
      })
  },

  render: function() {
    console.log(this.state)
    return (
    	<div className="story">
    		<h1>Hi</h1>
        <p>{this.state.text}</p>
      </div>
    )
  }

})

module.exports = Story
