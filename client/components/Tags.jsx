import React from 'react'

export default class SocialButtons extends React.Component {

  render() {
    const { form, about, length, location } = this.props
    return (
      <div className="tags">
        <h4>Tags</h4>
        <div>
          <p>form</p>
          <span>{form}</span>
          
          <p>about</p>
          <span>{about}</span>
          
          <p>length</p>
          <span>{length}</span>
          
          <p>location</p>
          <span>{location}</span>
        </div>
      </div>
    )
  }
}

SocialButtons.propTypes = {
  form: React.PropTypes.string.isRequired,
  about: React.PropTypes.string.isRequired,
  length: React.PropTypes.string.isRequired,
  location: React.PropTypes.string.isRequired,
}