import React from 'react'
import { browserHistory } from 'react-router'
import ResponseEditor from './ResponseEditor'

export default class Story extends React.Component {

  makeResponse(response) {
    return (
      <div key={response.id} className='response'>
        <div className='response-left'>
          <p>{response.title}</p>
          <p>{response.author}</p>
        </div>
        <div className='response-right'>
          <p>{response.content}</p>
        </div>
      </div>
    )
  }

  showEditor() {
    const { username, isAuthenticated, story_id } = this.props
    console.log('show editor props', this.props)
    if (isAuthenticated) {
      return <ResponseEditor story_id={story_id} />
    } else {
      console.log('not auth')
      return (
        <label>
          Login to contribute
          <button onClick={() => browserHistory.push('/login')}>Login</button>
        </label>
      )
    }
  }

  render() {
    const { responses } = this.props
    return (
      <div className='story-responses'>
        <h3 className='story-header'>Respond</h3>
        <p className='textcard'> New to the program? blah blah blah</p>
        {this.showEditor.bind(this)}
        { responses !== null ? responses.map(this.makeResponse) : null }
      </div>
    )
  }
}

Story.propTypes = {
  responses: React.PropTypes.array
}