var React = require('react')
var request = require('superagent')
var classnames = require('classnames')
var clicked = classnames({'clicked': true})

var B = React.createFactory(require('./Button.jsx'))

var Story = React.createClass({

  getInitialState: function() {
    return {
      text: "",
      author_name: "",
      title: "",
      img: "",
      editMode: false
    }
  },

  componentDidMount: function() {
    var self = this
    request
      .get('http://localhost:3000/api/' + this.props.params.id)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        self.setState({
          text: res.body.text,
          author_name: res.body.author_name,
          title: res.body.title,
          img: res.body.img,
        })
      })
  },

  handleNameChange: function(e) {
    this.setState({
      author_name: e.target.textContent
    })
  },
  handleTitleChange: function(e) {
    this.setState({
      title: e.target.textContent
    })
  },
  handleTextChange: function(e) {
    this.setState({
      text: e.target.textContent
    })
  },

  togleEditMode: function(e) {
    console.log('Enter edit mode')
    this.setState({
      editMode: !this.state.editMode
    })
  },

  saveEdits: function(e) {
    console.log('Saving your work...', this.state)
    request
      .post('http://localhost:3000/api/' + this.props.params.id)
      .set('Content-Type', 'application/json')
      .send(this.state)
      .end(function(err, res) {
        if (err) return alert('Big Error!')
        alert('Story Saved')
      })
  },

  render: function() {
    var btnClass = classnames({
      'clicked': this.state.editMode,
    });
    var storyClass = classnames({
      'story': true,
      'editing': this.state.editMode,
    });

    return (
      <div>
        <ul className="buttonList">
          <img src="/img/edit.png" onClick={this.togleEditMode} className={btnClass}></img>
          <img src="/img/check.png" onClick={this.saveEdits}></img>
        </ul>
      	<div className={storyClass}>
          <img src="/img/testbigimg.png"></img>
          <div>
        		<h2 contentEditable={this.state.editMode} onInput={this.handleTitleChange}>{this.state.title}</h2>
            <h3 contentEditable={this.state.editMode} onInput={this.handleNameChange}> - {this.state.author_name}</h3>
            <p contentEditable={this.state.editMode} onInput={this.handleTextChange}>{this.state.text}</p>
          </div>
        </div>
      </div>
    )
  }

})

module.exports = Story
