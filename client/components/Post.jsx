import React from 'react'
import request from 'superagent'
import ReactDOM from'react-dom'
// import Editor from '../../../react-medium-editor/dist/editor.js'
import Editor from './Editor.jsx'
import LeadImage from './LeadImage.jsx'
import classnames from 'classnames'

class Post extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: props.text,
      author_name: "Name",
      title: "Title",
      img: "/img/blankimg.png",
      data_uri: "",
      editing: false
    }
    this.toggleEditMode = this.toggleEditMode.bind(this)
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

  toggleEditMode() {
    this.setState({
      editing: !this.state.editing
    })
    console.log(this.inputref)
  }

  handleRef(e) {
    console.log(this.titleref)
  }

  // triggerUpload(e) {
  //   this.handleImg(this.inputref)
  // }

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

    // const imageStyle = classnames({
    //   'hidden': this.state.editing,
    // })
    // const inputStyle = classnames({
    //   'hidden': !this.state.editing,
    // })

    // const bgImageStyle = {
    //   'background': 'url(' + this.state.img + ')',
    // }

    return (
      <div className="story">
        
        <img src='/img/plus.png' onClick={this.toggleEditMode} className="logo right secondary"></img>
        <LeadImage src={this.state.img} editing={this.state.editing} onChange={this.handleImg}/>
        
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

export default Post
