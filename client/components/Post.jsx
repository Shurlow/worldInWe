var React = require('react')
var request = require('superagent')
var classnames = require('classnames')
var storyMain = classnames({'story': true})

var Post = React.createClass({

  getInitialState: function() {
    return {
      text: "Paste your story here..",
      author_name: "Name",
      title: "Title",
      img: "Photo url"
    }
  },

  handleNameChange: function(e) {
    this.setState({
      author_name: e.target.value
    })
  },
  handleTitleChange: function(e) {
    this.setState({
      title: e.target.value
    })
  },
  handleTextChange: function(e) {
    this.setState({
      text: e.target.value
    })
  },
  handleImgChange: function(e) {
    this.setState({
      img: e.target.value
    })
  },

  handleClick: function(e) {
    console.log()
    var self = this
    request
      .post('http://localhost:3000/api/story')
      .send(this.state)
      .end(function(err, res) {
        console.log('Posted')
      })
    console.log('post blocked')
  },

  render: function() {
    return (
      <div>
        <div className="biglead orange">
          <h2>Post a story of your own.</h2>
        </div>
      	<div className="post">
          <div>
            <h2>Name.</h2>
            <p>You can use your real name or your pen name!</p>
            <textarea className="name" type="text" value={this.state.author_name} onChange={this.handleNameChange} onfocus=""></textarea>
          </div>
          <div>
            <h2>Title.</h2>
            <p>Pick a title for your work</p>
            <textarea className="title" type="text" value={this.state.title} onChange={this.handleTitleChange} onfocus=""></textarea>
          </div>
          <div>
            <h2>Body.</h2>
            <p>Past or upload the body of your story here:</p>
            <textarea className="body" type="text" value={this.state.text} onChange={this.handleTextChange} onfocus=""></textarea>
          </div>
          <div>
            <h2>Photo.</h2>
            <p>Dont forget to add an image to start of your story. Large images look best!</p>
            <textarea className="photo" type="text" value={this.state.img} onChange={this.handleImgChange} onfocus=""></textarea>
          </div>
          <div className="button" onClick={this.handleClick}>Post</div>
        </div>
      </div>
    )
  }

})

module.exports = Post
