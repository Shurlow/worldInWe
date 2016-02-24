import React from 'react'
import Link from 'react-router'
// import request from 'superagent'
import classnames from 'classnames'
// import blacklist from 'blacklist'
import Editor from '../components/Editor.jsx'
import ImageUploader from '../components/ImageUploader.jsx'
import { fetchStory, uploadImage } from "../actions"
import { connect } from 'react-redux'

// var btnClass, btnClass2, storyClass;

class Story extends React.Component {

  constructor(props, context) {
    super(props, context)
    console.log('constructing', props)
    this.state = {
      text: props.text,
      author_name: props.author_name,
      title: props.title,
      img: props.img,
      id: props.params.id || "",
      editing: false
    }
  }

  componentWillMount() {
    console.log('Story Props:', this.props)
    this.props.fetchStory(this.state.id)

  }

  toggleEditMode(e) {
    // console.log('Toggle Edit Mode:', !this.state.editing)

    // this.setState({
    //   editing: !this.state.editing
    // })
  }

  handleImg(e) {
    var self = this;
    var findImgType = new RegExp("\:(.*?)\;")
    var findImgExtension = new RegExp("\.([0-9a-z]+)(?:[\?#]|$)")
    var reader = new FileReader()
    var file = e.target.files[0]

    reader.onload = function(data) {
      let image = data.target.result
      let imgtype = findImgType.exec(image)[1]
      self.setState({
        img: image,
        imgtype: imgtype
      })
      self.uploadImage()
    }
    reader.readAsDataURL(file);
  }

  uploadImage(e) {
    this.props.uploadImage(this.state.img, this.state.id)
  }

  saveStory(e) {
    var preparedStory = blacklist(this.state, 'editing', 'img')
    this.props.uploadStory(preparedStory)
  }

  render() {
    const storyClass = classnames({
      story: true,
      editor: this.state.editing
    })
    return (
      <div>
        <ImageUploader src={"https://s3-us-west-2.amazonaws.com/world-in-me/" + this.state.id + ".jpg"} editing={this.state.editing} onChange={this.handleImg.bind(this)}/>
        <div className={storyClass}>
          <div className="controlbar">
            <Link to={'edit/' + this.state.id}>
              <h3>EDIT</h3>
            </Link>
            <div className="bigbar"></div>
          </div>
          <h1 className="title">{this.props.title}</h1>
          <h2 className="author">{this.props.author_name}</h2>
          <p className="text">{this.props.text}</p>
        </div>
      </div>
    )
  }

}

Story.defaultProps = {
  text: "Type your story here",
  title: "Title",
  author_name: "Name",
  img: "/img/blankimg.png"
}

const mapStateToProps = (state) => ({
  text: state.data.selectedStory.text,
  title: state.data.selectedStory.title,
  author_name: state.data.selectedStory.author_name
});

export default connect(mapStateToProps, {
  fetchStory,
  uploadImage
})(Story)

// <Editor
//             tag="h1"
//             className="title"
//             text={this.state.title}
//             isEditing={this.state.editing}
//             onChange={this.handleTitleChange.bind(this)}
//             ref={(c) => this.titleref = c}
//           />
//           <Editor
//             tag="h2"
//             className="author"
//             text={this.state.author_name}
//             isEditing={this.state.editing}
//             onChange={this.handleNameChange.bind(this)}
//             ref={(c) => this.authref = c}
//           />
//           <Editor
//             tag="p"
//             className="text"
//             text={this.state.text}
//             isEditing={this.state.editing}
//             onChange={this.handleTextChange.bind(this)}
//             ref={(c) => this.textref = c}
//           />