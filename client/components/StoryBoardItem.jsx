import React from 'react'
import { browserHistory } from 'react-router'

export default class StoryBoardItem extends React.Component {

  navigateToStory() {
    browserHistory.push('stories/' + this.props.id)
  }

  imgError() {
    this._image.src = '/res/placeholder.png'
  }

  render() {
    const id = this.props.id
    const imgsrc = "https://s3-us-west-2.amazonaws.com/worldinme-full/" + id + ".jpg"
    const imgthumb = "https://s3-us-west-2.amazonaws.com/worldinme-thumbs/" + id + ".jpg"

    return (
      <article
        style={{backgroundImage: `url(${imgsrc})`}}
        onClick={() => {browserHistory.push(`story/${id}`)}}>
        <div className='caption'>
          <p>Documentary about Faith and Leadership in 4 minutes</p>
          <h1>{this.props.title}</h1>
        </div>
      </article>
    )
 }
}

StoryBoardItem.defaultProps = {
  title: "No Title Found for This Story",
  firstline: "Here is a sample first line of a story that starts like this..."
}