import React from 'react'

export default class SocialButtons extends React.Component {

  render() {
    let url = window.location.href
    let title = this.props.title
    return (
      <div className="social-buttons">
        <h4>Share This Story</h4>
        <div>
          <a href={`http://www.facebook.com/share.php?u=${url}&title=${title}`}>Facebook</a>
          <a href={`http://twitter.com/intent/tweet?status=${title}+${url}`}>Twitter</a>
        </div>
      </div>
    )
  }
}

SocialButtons.propTypes = {
  title: React.PropTypes.string.isRequired
}