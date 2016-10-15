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
    const { id, tags, title } = this.props
    const imgsrc = "https://s3-us-west-2.amazonaws.com/worldinme-full/" + id + ".jpg"
    const imgthumb = "https://s3-us-west-2.amazonaws.com/worldinme-thumbs/" + id + ".jpg"
    return (
      <article
        style={{backgroundImage: `url(${imgsrc})`}}
        onClick={() => {browserHistory.push(`story/${id}`)}}>
        <div className='caption'>
          <h3>
            <span className='form'>{tags.form}</span>
            <span> about </span>
            <span className='theme'>{tags.theme[0]}</span>
            <span> & </span>
            <span className='theme'>{tags.theme[1]}</span>
            <span> in </span>
            <span className='length'>{tags.length}</span>
          </h3>
          <h1>{title}</h1>
        </div>
      </article>
    )
 }
}

StoryBoardItem.defaultProps = {
  title: "No Title Found for This Story",
  firstline: "Here is a sample first line of a story that starts like this..."
}