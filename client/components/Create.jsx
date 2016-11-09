import React from 'react'
import ImageUploader from './ImageUploader'
import CustomEditor from './Editor'
import ArticleWithBg from './ArticleWithBg'
// import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import { randomBgImg } from '../util'

export default class CreateStory extends React.Component {

  renderButtons() {
    return (
      <div className='page login'>
        <ArticleWithBg>
          <div className='small-card center'>
            <h2>Create something?</h2>
            <div className='button-group'>
              <button className='primary' onClick={() => browserHistory.push('create/story')}>story</button>
              <button className='primary' onClick={() => browserHistory.push('create/topic')}>topic</button>
            </div>
          </div>
        </ArticleWithBg>
      </div>
    )
  }

  render() {
    return this.props.children || this.renderButtons()
  }
}