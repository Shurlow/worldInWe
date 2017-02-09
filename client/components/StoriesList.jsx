import React from 'react'
import ImageLoader from 'react-imageloader'
import { Link } from 'react-router'

export default class StoriesList extends React.Component {

  makeStoryCard(story) {
    const { id, title } = story
    return (
      <Link key={id} to={`story/${id}`} className='stories-link'>
        <ImageLoader
          src={`https://s3.amazonaws.com/wiw-thumb/${id}.jpg`}
          preloader={()=> <img className='loader' src='/res/loader.gif'/>}
        />
      <h3 className='title-over'>{title}</h3>
      </Link>
    )
  }

  render() {
    const stories = this.props.stories
    const isStories = (stories && stories.length !== 0)
    return (
      <div className='fillwhite'>
        { isStories ? stories.map(this.makeStoryCard) : 'No stories found' }
      </div>
    )
  }
}
