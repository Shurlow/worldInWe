import React from 'react'
import request from 'superagent'
import ReactDOM from'react-dom'
// import Editor from '../../../react-medium-editor/dist/editor.js'
import Editor from './Editor.jsx'
import classnames from 'classnames'

class Post extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: props.text,
      author_name: "Name",
      title: "Title",
      img: "/img/blankimg.png",
      data_uri: ""
    }
  }

  handleTitleChange(value) {
    this.setState({
      title: value
    })
  }
  handleNameChange(value) {
    this.setState({
      author_name: value
    })
  }
  handleTextChange(value) {
    this.setState({
      text: value
    })
  }

  handleImgChange(e) {
    this.setState({
      img: e.target.value
    })
  }

  triggerUpload(e) {
    console.log(document.getElementById("upload"))
    // document.getElementById("upload").onchange()
  }

  handleImg(e) {
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(upload) {
      self.setState({
        img: upload.target.result,
      });
    }

    reader.readAsDataURL(file);
  }

  submitStory(e) {
    var obj = this.state
    request
      .post('http://localhost:3000/api/')
      .set('Content-Type', 'application/json')
      .send(obj)
      .end(function(err, res) {
        console.log(err, res)
      })
  }

  render() {
    return (
      <div className="story editable">
        <img className="editorbutton" src="/img/check.png" onClick={this.submitStory.bind(this)}></img>
        <img src={this.state.img}></img>
        <input id="upload"type="file" accept="image/*" onChange={this.handleImg.bind(this)}></input>

        <Editor
          tag="h2"
          className="title"
          text={this.state.title}
          onChange={this.handleTitleChange.bind(this)}
        />
        <Editor
          tag="h3"
          className="author"
          text={this.state.author_name}
          onChange={this.handleNameChange.bind(this)}
        />
        <Editor
          tag="p"
          className="text"
          text={this.state.text}
          onChange={this.handleTextChange.bind(this)}
        />

      </div>
    )
  }

}

export default Post
