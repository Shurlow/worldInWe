import React from 'react'
// import request from 'superagent'
// import ReactDOM from'react-dom'
// import Editor from '../../../react-medium-editor/dist/editor.js'
import Editor from './Editor.jsx'
import ImageUploader from './ImageUploader.jsx'
import Story from './Story.jsx'
import classnames from 'classnames'
// import blacklist from 'blacklist'

class Post extends Story {

  constructor(props) {
    super(props)
    this.state = {
      text: "",
      author_name: "",
      title: "",
      img: "/img/blankimg.png",
      editing: false,
      id: guid()
    }
  }

  componentDidMount() {
    console.log('mounted')
  }

  render() {
    // console.log('render story', this.state)
// <img src='/img/plus.png' onClick={this.toggleEditMode.bind(this)} className="logo right second"></img>
        // <img src='/img/check.png' onClick={this.saveStory.bind(this)} className="logo right third"></img>
    const storyClass = classnames({
      story: true,
      editor: this.state.editing
    })

    return (
      <div className="newstory">
        
        <ImageUploader src={this.state.img} editing={this.state.editing} onChange={this.handleImg.bind(this)}/>
        <div className={storyClass}>
          <Editor
            tag="h2"
            className="title"
            text={this.state.title}
            isEditing={this.state.editing}
            onChange={this.handleTitleChange.bind(this)}
            placeholder={this.props.title}
            ref={(c) => this.titleref = c}
          />
          <Editor
            tag="h3"
            className="author"
            text={this.state.author_name}
            isEditing={this.state.editing}
            onChange={this.handleNameChange.bind(this)}
            placeholder={this.props.author_name}
            ref={(c) => this.authref = c}
          />
          <Editor
            tag="p"
            className="text"
            text={this.state.text}
            isEditing={this.state.editing}
            onChange={this.handleTextChange.bind(this)}
            placeholder={this.props.text}
            ref={(c) => this.textref = c}
          />
        </div>
      </div>
    )
  }
}

Post.defaultProps = {
  text: "Type your story here",
  title: "Title",
  author_name: "Name"
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
