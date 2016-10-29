import React from 'react'
import ImageUploader from './ImageUploader'
import CustomEditor from './Editor'
import { Link } from 'react-router'
import { randomBgImg } from '../util'

export default class CreateStory extends React.Component {

  renderButtons() {
    return (
      <div className='card'>
        <h2>Create something?</h2>
        <Link to='create/story' className='bigbutton'>Story</Link>
        <Link to='create/topic' className='bigbutton'>Topic</Link>
      </div>
    )
  }

  render() {
    return (
      <div className='story'>
        <div
          className='story-content'
          style={{backgroundImage: `url(${randomBgImg()})`}}>
          <article>
            {this.props.children || this.renderButtons()}
          </article>
        </div>
      </div>
    )
  }
}