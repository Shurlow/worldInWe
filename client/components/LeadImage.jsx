import React from 'react'
import ReactDom from 'react-dom'
import classnames from 'classnames'

export default class LeadImage extends React.Component {

  constructor(props) {
    super(props)
  }

  makeImage() {

    const imageStyle = classnames({
      'hidden': this.props.editing,
    })

    const inputStyle = classnames({
      'hidden': !this.props.editing,
    })

    const bgImageStyle = {
      'background': 'url(' + this.props.src + ') no-repeat',
    }

    if (this.props.editing) {
      return (
        <input
          className={inputStyle}
          style={bgImageStyle}
          type="file"
          accept="image/*"
          onChange={this.props.onChange}
        />
      )
    }
  }

  triggerUpload() {
    this.inputref.click()
  }

  render() {
    // console.log('Leadimage:', this.props)
    const inputStyle = classnames({
      'hidden': !this.props.editing,
    })
    // const imageStyle = classnames({
    //   'hidden': this.props.editing,
    // })
    return (
      <div className="leadimg">
        <img src={this.props.src} onClick={this.triggerUpload.bind(this)}></img>
          <input
          // className={inputStyle}
          // style={bgImageStyle}
          type="file"
          accept="image/*"
          onChange={this.props.onChange}
          ref={(c) => this.inputref = c}
        />
      </div>
    )
  }
}