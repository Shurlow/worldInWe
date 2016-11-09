import React from 'react'
import ArticleWithBg from './ArticleWithBg'
import { Link } from 'react-router'

export default class Create extends React.Component {

  render() {
    return (
      <div className='page login'>
        <ArticleWithBg>
          <div className='small-card center'>
            <h2>Oops!</h2>
            <p>This feature is still in development..</p>
            <div className='button-group'>
              <Link to='/create' className='button secondary'>ok</Link>
            </div>
          </div>
        </ArticleWithBg>
      </div>
    )
  }
}