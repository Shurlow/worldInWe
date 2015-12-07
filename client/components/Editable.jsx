import React from 'react'
import request from 'superagent'
import ReactDOM from'react-dom'
// import Editor from 'react-medium-editor'
import classnames from 'classnames'

var toolbarOptions = {
  allowMultiParagraphSelection: true,
  buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
  diffLeft: 0,
  diffTop: -10,
  firstButtonClass: 'medium-editor-button-first',
  lastButtonClass: 'medium-editor-button-last',
  standardizeSelectionStart: false,
  static: false,
  relativeContainer: null,
}

const Editable = React.createClass({

  getInitialState() {
    return {
      text: "body text",
      author_name: "author",
      title: "Title",
      img: "",
      editing: false
    }
  },

  componentDidMount() {
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

  handleTitleChange: function(value, medium) {
    console.log(value, medium)
    this.setState({
      title: value
    })
  },
  handleNameChange: function(value) {
    this.setState({
      author_name: value
    })
  },
  handleTextChange: function(value) {
    this.setState({
      text: value
    })
  },

  toggleEditMode: function(e) {
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

  render() {
    var storyClass = classnames({
      'story': true,
      'editing': this.state.editing
    })

    return (
      <div>
        <div id="fleximg">
          <img className="leadimg" src="/img/testbigimg.png"></img>
        </div>
        <div className="story">

          <Editor
            tag="h2"
            className="title"
            text={this.state.title}
            onChange={this.handleTitleChange}
            options={{
              disableEditing: true,
              toolbar: toolbarOptions
            }}
          />

          <Editor
            tag="h3"
            className="author"
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            text={this.state.author_name}
            onChange={this.handleNameChange}
            options={{toolbar: toolbarOptions}}
          />

          <Editor
            tag="p"
            className="text"
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            text={this.state.text}
            onChange={this.handleTextChange}
            options={{toolbar: toolbarOptions}}
          />
        </div>
      </div>
    );
  },

  handleFocus() {
    console.log('onFocus');
  },

  handleBlur() {
    console.log('onBlur');
  },

});

export default Editable