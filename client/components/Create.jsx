import React from 'react'
import ImageUploader from './ImageUploader'
import CustomEditor from './Editor'
import { Link } from 'react-router'
import { guid } from '../util'

export default class CreateStory extends React.Component {

  renderButtons() {
    return (
      <article className='login'>
        <div className='card'>
          <h2>Create something?</h2>
          <Link to='create/story' className='bigbutton'>Story</Link>
          <Link to='create/topic' className='bigbutton'>Topic</Link>
        </div>
      </article>
    )
  }

  render() {
    // const { id, user_id, uploadStory, bgimg } = this.props
    console.log('Create', this.props)
    return (
      <div>
        {this.props.children || this.renderButtons()}
      </div>
    )
  }
}

// CreateStory.defaultProps = {
//   content: [""],
//   author: "anonymous",
//   title: "No title",
//   img: "/res/placeholder.png",
//   bgimg: "img/adventure.jpeg",
//   id: guid()
// }