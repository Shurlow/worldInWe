import React from 'react'
import ImageLoader from 'react-imageloader'
import { Link } from 'react-router'

export default class StoriesList extends React.Component {

  makeStoryCard(story) {
    const { id, title } = story
    return (
      <Link to={`story/${id}`} className='stories-link'>
        <ImageLoader
          src={`https://s3.amazonaws.com/wiw-thumb/${id}.jpg`}
          preloader={()=> <img className='loader' src='/res/loader.gif'/>}
        />
        <h4>{title}</h4>
      </Link>
    )
  }

  render() {
    const stories = this.props.stories
    return (
      <div>
        { stories ? stories.map(this.makeStoryCard) : null }
      </div>
    )
  }
}