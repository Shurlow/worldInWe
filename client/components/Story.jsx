import React from 'react'
import Link from 'react-router'
import request from 'superagent'
import classnames from 'classnames'
import blacklist from 'blacklist'
// import history from './history'
import Editor from './Editor.jsx'
import ImageUploader from './ImageUploader.jsx'
// import LeadImage from './LeadImage.jsx'

// var btnClass, btnClass2, storyClass;

class Story extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      text: props.text,
      author_name: props.author_name,
      title: props.title,
      img: props.img,
      id: props.params.id || "",
      editing: false
    }
  }

  // mixins: [ History ]

  //Helper function that pushes Editor components to update state manually
  //pretty much use once for first api update
  pushState() {
    this.titleref.update(this.state.title)
    this.authref.update(this.state.author_name)
    this.textref.update(this.state.text)
  }

  componentDidMount() {
    var self = this
    request
      // .get('http://worldinme.xyz/api/' + this.state.id)
      .get( self.context.api_url + self.state.id)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if (err) return console.error(err)
        self.setState({
          text: res.body.text,
          author_name: res.body.author_name,
          title: res.body.title,
          img: res.body.img,
          id: res.body.id
        })
        self.pushState()
      })
      // this.goHome()
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

  // handleImgChange(e) {
  //   this.setState({
  //     img: e.target.value
  //   })
  // }

  toggleEditMode(e) {
    console.log('Toggle Edit Mode:', !this.state.editing)
    this.setState({
      editing: !this.state.editing
    })
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
    var self = this

    request
      .post( this.context.api_url + 'image/' + this.state.id)
      // .set('Accept', this.state.imgtype)
      .set('Accept', 'application/json')
      .send({
        img: this.state.img,
      })
      .end(function(err, res) {
        if (err) {
          alert(err)
          self.setState({
            img: self.props.img
          })
        } else {
          alert("Image saved.") 
        }
      })
  }

  postNewStory(e) {
    var self = this
    var preparedStory = blacklist(this.state, 'editing', 'img')

    request
      .post( this.context.api_url )
      .set('Accept', 'application/json')
      .send(preparedStory)
      .end(function(err, res) {
        // console.log(err, res)
        if (err) {
          alert(err)
        } else {
          alert("Your story is uploaded!")
          self.props.history.replaceState(null, '/stories')
        }
      })

  }

  saveStory(e) {
    var self = this
    var preparedStory = blacklist(this.state, 'editing', 'img')
    // console.log('Prepd Story:', preparedStory)

    request
      .post( this.context.api_url + '/update/' + this.state.id)
      .set('Accept', 'application/json')
      .send(preparedStory)
      .end(function(err, res) {
        // console.log(err, res)
        if (err) {
          alert(err)
        } else {
          alert("Your story is uploaded!")
          self.props.history.replaceState(null, '/home')
        }
      })

  }

  deleteStory(e) {
    var self = this

    request
      .post( this.context.api_url + '/delete/' + this.state.id)
      .end(function(err, res) {
        // console.log(err, res)
        if (err) {
          alert(err)
        } else {
          alert(res)
          self.props.history.replaceState(null, '/stories')
        }
      })

  }

  // defineClasses() {
  //   // btnClass = classnames({
  //   //   'clicked': this.state.editMode,
  //   // });
    
  //   // btnClass2 = classnames({
  //   //   'visible': this.state.editMode,
  //   //   'slidebutton': true,
  //   // });
    
  //   const storyClass = classnames({
  //     story: true,
  //     editor: this.state.editing
  //   })
  // }

  render() {
    // console.log('render story', this.state)
// <LeadImage src={this.state.img} editing={this.state.editing} onChange={this.handleImg.bind(this)}/>
    const storyClass = classnames({
      story: true,
      editor: this.state.editing
    })
    return (
      <div>
        <ImageUploader src={"https://s3-us-west-2.amazonaws.com/world-in-me/" + this.state.id + ".jpg"} editing={this.state.editing} onChange={this.handleImg.bind(this)}/>
        <div className={storyClass}>
          <div className="controlbar">
            <span onClick={this.toggleEditMode.bind(this)}>Edit</span>
            <span onClick={this.saveStory.bind(this)}>Save</span>
            <span onClick={this.deleteStory.bind(this)}>delete</span>
            <div className="bigbar"></div>
          </div>
          <Editor
            tag="h2"
            className="title"
            text={this.state.title}
            isEditing={this.state.editing}
            onChange={this.handleTitleChange.bind(this)}
            ref={(c) => this.titleref = c}
          />
          <Editor
            tag="h3"
            className="author"
            text={this.state.author_name}
            isEditing={this.state.editing}
            onChange={this.handleNameChange.bind(this)}
            ref={(c) => this.authref = c}
          />
          <Editor
            tag="p"
            className="text"
            text={this.state.text}
            isEditing={this.state.editing}
            onChange={this.handleTextChange.bind(this)}
            ref={(c) => this.textref = c}
          />
        </div>
      </div>
    )
  }

}

Story.contextTypes = {
  api_url: React.PropTypes.string.isRequired
};

Story.defaultProps = {
  text: "Type your story here",
  title: "Title",
  author_name: "Name",
  img: "/img/blankimg.png"
}



export default Story