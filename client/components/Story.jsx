var React = require('react')
import Link from 'react-router'
var request = require('superagent')
var classnames = require('classnames')
var btnClass, btnClass2, storyClass;




var Story = React.createClass({

  getInitialState: function() {
    return {
      text: "...",
      author_name: "author",
      title: "Title",
      img: "/img/testbigimg.png",
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
    this.setState({
      editMode: !this.state.editMode
    })
  },

  saveEdits: function(e) {
    console.log('Saving your work...', this.state)
    request
      .post('http://localhost:3000/api/update/' + this.props.params.id)
      .set('Content-Type', 'application/json')
      .send(this.state)
      .end(function(err, res) {
        if (err) return alert('Big Error!')
        alert('Story Saved')
      })
  },

  handleFocus: function() {
    console.log('onFocus');
  },

  handleBlur: function() {
    console.log('onBlur');
  },

  handleChange: function(text, medium) {
    this.setState({
      text: text
    });

    console.log('medium', medium);
  },

  defineClasses: function() {
    btnClass = classnames({
      'clicked': this.state.editMode,
    });
    
    btnClass2 = classnames({
      'visible': this.state.editMode,
      'slidebutton': true,
    });
    
    storyClass = classnames({
      'story': true,
      'editing': this.state.editMode,
    });
  },

  render: function() {
    this.defineClasses()
    return (
      <div>
        <ul className="buttonList">
          <img src="/img/edit.png" onClick={this.togleEditMode} className={btnClass}></img>
          <img src="/img/check.png" onClick={this.saveEdits} className={btnClass2}></img>
          <Link to='/stories/9fb5#/edit' className="e"><p>TEST</p></Link>
        </ul>
        <div id="fleximg">
          <img className="leadimg" src={this.state.img}></img>
        </div>
        <div className={storyClass}>
          <div>
            <h2 contentEditable={this.state.editMode} onInput={this.handleTitleChange}>{this.state.title}</h2>
            <h3 contentEditable={this.state.editMode} onInput={this.handleNameChange}> - {this.state.author_name}</h3>
            <div>
              <p contentEditable={this.state.editMode} onInput={this.handleTextChange}>{this.state.text}</p>
            </div>
          </div>
        </div>
        
      </div>
    )
  }

})

module.exports = Story


