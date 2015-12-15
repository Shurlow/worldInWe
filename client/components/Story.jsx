import React from 'react'
import Link from 'react-router'
import request from 'superagent'
import classnames from 'classnames'
import blacklist from 'blacklist'
// import history from './history'
import Editor from './Editor.jsx'
import LeadImage from './LeadImage.jsx'

var btnClass, btnClass2, storyClass;

class Story extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: "...",
      author_name: "author",
      title: "Title",
      img: "/img/testbigimg.png",
      imgtype: "",
      imgext: "",
      id: "",
      editing: false
    }
  }

  // mixins: [ History ]

  //Helper function that pushes Editor components to update state manually
  //pretty much use once for api update
  pushState() {
    this.titleref.update(this.state.title)
    this.authref.update(this.state.author_name)
    this.textref.update(this.state.text)
  }

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
          id: res.body.id
        })
        self.pushState()
      })
      this.goHome()
  }

  handleTitleChange(value) {
    console.log('Setting Title:', value)
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

  toggleEditMode(e) {
    this.setState({
      editMode: !this.state.editMode
    })
  }

  handleImg(e) {
    var self = this;
    var findImgType = new RegExp("\:(.*?)\;")
    var findImgExtension = new RegExp("\.([0-9a-z]+)(?:[\?#]|$)")
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(data) {
      let image = data.target.result
      let ext = findImgExtension.exec(file.name)[0]
      let type = findImgType.exec(image)[1]
      let withExtension = (self.state.imgext == ext)
      self.setState({
        img: image,
        imgtype: type,
        imgext: ext
      });
      self.saveImage(withExtension)
    }
    reader.readAsDataURL(file);
  }

  saveImage(withExtension) {
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
      console.log("With Extension? ", withExtension)
      if (withExtension) {
        self.saveEdits()
      }
  }

  saveEdits() {
    var self = this
    var preparedStory = blacklist(this.state, 'imgtype', 'imgext', 'editing')
    
    request
      .post('http://localhost:3000/api/update/' + this.state.id)
      .set('Content-Type', 'application/json')
      .send(preparedStory)
      .end(function(err, res) {
        if (err) {
          alert('Big Error!')
        } else {
          alert('Story Saved')
        }
      })
  }

  defineClasses() {
    // btnClass = classnames({
    //   'clicked': this.state.editMode,
    // });
    
    // btnClass2 = classnames({
    //   'visible': this.state.editMode,
    //   'slidebutton': true,
    // });
    
    const storyClass = classnames({
      story: true,
      editor: this.state.editing
    })
  }

  render() {
    console.log('render story', this.state)

    const storyClass = classnames({
      story: true,
      editor: this.state.editing
    })
    return (
      <div>
        <img src='/img/plus.png' onClick={this.toggleEditMode.bind(this)} className="logo right second"></img>
        <img src='/img/check.png' onClick={this.saveEdits.bind(this)} className="logo right third"></img>
        <LeadImage src={this.state.img} editing={this.state.editing} onChange={this.handleImg.bind(this)}/>
        <div className={storyClass}>
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
            ref={(c) => this.authref = c}
          />
          <Editor
            tag="p"
            className="text"
            text={this.state.text}
            onChange={this.handleTextChange.bind(this)}
            ref={(c) => this.textref = c}
          />
        </div>
      </div>
    )
  }

}

export default Story

// <ul className="buttonList">
//           <img src="/img/edit.png" onClick={this.togleEditMode} className={btnClass}></img>
//           <img src="/img/check.png" onClick={this.saveEdits} className={btnClass2}></img>
//           <Link to='/stories/9fb5#/edit' className="e"><p>TEST</p></Link>
//         </ul>


