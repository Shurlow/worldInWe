import React from 'react'
import request from 'superagent'
import ReactDOM from'react-dom'
// import Editor from '../../../react-medium-editor/dist/editor.js'
import Editor from './Editor.jsx'
import LeadImage from './LeadImage.jsx'
import classnames from 'classnames'
import blacklist from 'blacklist'

class Post extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: "Your story goes here..",
      author_name: "Name",
      title: "Title",
      img: "/img/blankimg.png",
      imgtype: "",
      imgext: "",
      editing: false,
      id: guid()
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

  toggleEditMode() {
    this.setState({
      editing: !this.state.editing
    })
    console.log(this.inputref)
  }

  handleImg(e) {
    var self = this;
    var findImgType = new RegExp("\:(.*?)\;")
    var findImgExtension = new RegExp("\.([0-9a-z]+)(?:[\?#]|$)")
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(data) {
      var image = data.target.result
      self.setState({
        img: image,
        imgtype: findImgType.exec(image)[1],
        imgext: findImgExtension.exec(file.name)[0]
      });
      self.saveImage()
    }
    reader.readAsDataURL(file);
  }

  saveImage() {
    var self = this
    // Store image
    request
      .post('http://localhost:3000/api/image')
      .set('Accept', this.state.imgtype)
      .send({
        image: this.state.img,
        id: this.state.id,
        extension: this.state.imgext
      })
      .end(function(err, res) {
        console.log(err, res)
        if (err) {
          alert(err)
        } else {
          alert("Image Saved")
        }
      })
  }

  submitStory(e) {
    var self = this
    var preparedStory = blacklist(this.state, 'imgtype', 'imgext', 'editing')
    preparedStory.img = 'http://s3-us-west-2.amazonaws.com/world-in-me/' + this.state.id + this.state.imgext

    request
      .post('http://localhost:3000/api/')
      .set('Accept', 'application/json')
      .send(preparedStory)
      .end(function(err, res) {
        console.log(err, res)
        if (err) {
          alert(err)
        } else {
          self.props.history.replaceState(null, '/home')
        }
      })
  }

  render() {

    const storyClass = classnames({
      story: true,
      editor: this.state.editing
    })

    return (
      <div className={storyClass}>
        
        <img src='/img/plus.png' onClick={this.toggleEditMode.bind(this)} className="logo right second"></img>
        <img src='/img/check.png' onClick={this.submitStory.bind(this)} className="logo right third"></img>
        <LeadImage src={this.state.img} editing={this.state.editing} onChange={this.handleImg.bind(this)}/>
        
        <Editor
          tag="h2"
          className="title"
          text={this.state.title}
          onChange={this.handleTitleChange.bind(this)}
          ref={(c) => this.titleref = c}
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

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4();
}

export default Post
