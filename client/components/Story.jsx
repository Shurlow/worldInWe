var React = require('react')
var request = require('superagent')
var classnames = require('classnames')
var storyMain = classnames({'story': true})

var Story = React.createClass({

  getInitialState: function() {
    return {
      text: "",
      author: "",
      title: "",
      img: ""
    }
  },

  componentDidMount: function() {
    var self = this
    request
      .get('http://localhost:3000/api/' + this.props.params.id)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        console.log(err)
        self.setState({
          text: res.body.text,
          author: res.body.author_name,
          title: res.body.title,
          img: res.body.img,
        })
      })
  },

  render: function() {
    console.log(this.state)
    return (
    	<div className="story">
        <img src={this.state.img}></img>
        <div className="text">
      		<h2>{this.state.title}</h2>
          <h3> - {this.state.author}</h3>
          <p>{this.state.text}</p>
        </div>
      </div>
    )
  }

})

module.exports = Story
