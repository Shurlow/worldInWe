import React from 'react'
import Link from 'react-router'
import Editor from './Editor.jsx'
import request from 'superagent'
import classnames from 'classnames'
// import ImageBlurLoader from '../../../react-imageblurloader/src/ImageBlurLoader.js'
var btnClass, btnClass2, storyClass;

class Story extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: "...",
      author_name: "author",
      title: "Title",
      img: "/img/testbigimg.png",
      editMode: false,
    }
  }

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
        })
        self.pushState()
      })
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


  togleEditMode(e) {
    this.setState({
      editMode: !this.state.editMode
    })
  }

  saveEdits(e) {
    console.log('Saving your work...', this.state)
    request
      .post('http://localhost:3000/api/update/' + this.props.params.id)
      .set('Content-Type', 'application/json')
      .send(this.state)
      .end(function(err, res) {
        if (err) return alert('Big Error!')
        alert('Story Saved')
      })
  }

  handleFocus() {
    console.log('onFocus');
  }

  handleBlur() {
    console.log('onBlur');
  }

  // handleChange(text, medium) {
  //   this.setState({
  //     text: text
  //   });
  // },

  defineClasses() {
    // btnClass = classnames({
    //   'clicked': this.state.editMode,
    // });
    
    // btnClass2 = classnames({
    //   'visible': this.state.editMode,
    //   'slidebutton': true,
    // });
    
    storyClass = classnames({
      'story': true,
      'editing': this.state.editMode,
    });
  }

  render() {
    console.log('render story', this.state)
    this.defineClasses()
    return (
      <div>
        <div id="fleximg">
          <img className="leadimg" src={this.state.img}></img>
          <ImageBlurLoader
            src={this.state.img}
            preview={"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gODAK/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/9sAQwEKCwsODQ4cEBAcOygiKDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7/8AAEQgADQAUAwEiAAIRAQMRAf/EABgAAAMBAQAAAAAAAAAAAAAAAAAFBwYI/8QAJBAAAgEDBAICAwAAAAAAAAAAAQIDAAQRBQYSIQcxE0FxgcL/xAAVAQEBAAAAAAAAAAAAAAAAAAABAv/EABcRAQEBAQAAAAAAAAAAAAAAAAAhERL/2gAMAwEAAhEDEQA/AH8W9k1xVittwG2u5UINrb2/Jo8ZZjzbphx6BA91qdnzXFzognnuprlHkb4XmILlB12QB9gnuuarZn0vcJhgkbEUrxqSe8HkufziqL423XNo9huWQ2yzJC0c6xh+ABbKn6OPQqcp6lVsas8t1dQwWbSC2lETPzABPBW/rFFJfHGpS6ztybVZURJL29llZVzhewAP0AKKQ//Z"}
          />
        </div>
        <div className={storyClass}>
          <div>
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


