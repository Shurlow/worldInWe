import React from 'react'
import { browserHistory } from 'react-router'
import ResponseEditor from './ResponseEditor'

export default class Responses extends React.Component {

  makeResponse(response) {
    return (
      <div key={response.id} className='response'>
        <div className='response-left'>
          <p>{response.title}</p>
          <p>{response.author}</p>
          <p>{new Date(response.date).toString()}</p>
        </div>
        <div className='response-right'>
          <p>{response.content}</p>
        </div>
      </div>
    )
  }

  showEditor() {
    if (this.props.isAuthenticated) {
      return <ResponseEditor {...this.props}/>
    } else {
      return (
        <label>
          Login to contribute
          <button onClick={() => browserHistory.push(`/login?next=/story/${story_id}`)}>
            Login
          </button>
        </label>
      )
    }
  }

  render() {
    const { responses, isFetching } = this.props
    // if (responses) {
      // responses.reverse()
    // }
    return (
      <div className='story-responses'>
        <h3 className='story-header'>Respond</h3>
        <p className='textcard'> New to the program? blah blah blah</p>
        {this.showEditor()}
        { responses !== null ? responses.map(this.makeResponse) : null }
      </div>
    )
  }
}

Responses.propTypes = {
  responses: React.PropTypes.array
}