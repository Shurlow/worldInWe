import React from 'react'

export default class SocialButtons extends React.Component {

  render() {
    let url = window.location.href
    let title = this.props.title
    return (
      <div className="social-buttons">
        <h3>Share This Story</h3>
        <div>
          <a target="_blank" href={`http://www.facebook.com/share.php?u=${url}&title=${title}`}>
            <img src='/res/fblogo.png' />
          </a>
          <a target="_blank" href={`http://twitter.com/intent/tweet?status=${title}+${url}`}>
            <img src='/res/twitterlogo.png' style={{marginLeft: '1em'}}/>
          </a>
        </div>
      </div>
    )
  }
}

SocialButtons.propTypes = {
  title: React.PropTypes.string.isRequired
}