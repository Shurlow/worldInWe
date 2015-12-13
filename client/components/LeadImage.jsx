import React from 'react'
import ReactDom from 'react-dom'
import classnames from 'classnames'

export default class LeadImage extends React.Component {

  constructor(props) {
    super(props)
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

  makeImage() {

    const imageStyle = classnames({
      'hidden': this.props.editing,
    })

    const inputStyle = classnames({
      'hidden': !this.props.editing,
    })

    const bgImageStyle = {
      'background': 'url(' + this.props.src + ')',
    }
    if (this.props.editing) {
      console.log('render input')
      return (
        <input
          className={inputStyle}
          style={bgImageStyle}
          type="file"
          accept="image/*"
          onChange={this.props.onChange}
        />
      )
    } else {
      console.log('render plain img')
      return (
        <img src={this.props.src} className={imageStyle}></img>
      )
    }
  }

  render() {
    console.log('Leadimage:', this.props)
    return (
      <div className="leadimg">
        {this.makeImage()}
      </div>
    )
  }
}