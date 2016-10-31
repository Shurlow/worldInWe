import React from 'react'
import { browserHistory } from 'react-router'
import ResponseEditor from './ResponseEditor'
import Response from './Response'

export default class ResponseList extends React.Component {

  showEditor() {
    const { isAuthenticated, story_id } = this.props
    if (isAuthenticated) {
      return <ResponseEditor {...this.props}/>
    } else {
      return (
        <label className='response'>
          Login to contribute
          <button onClick={() => browserHistory.push(`/login?next=/story/${story_id}`)}>
            Login
          </button>
        </label>
      )
    }
  }

  makeResponse(response) {
    return (
      <Response
        token={this.props.token}
        deleteResponse={this.props.deleteResponse}
        user_id={this.props.user_id}
        {...response}
      />
    )
  }

  render() {
    const { responses, isFetching } = this.props
    return (
      <div className='story-responses space-top'>
        <header className="center"><h3>Respond</h3></header>
        <div className='small-card center'>
          <h4>New to the program?</h4>
          <ol>
            <li>In less than 25 words, write what your legacy in your community will be.</li>
            <li>A.K. says, "Failure keeps you active." Tell a non-fiction story about how you shared this experience in the pursuit of your goals. What insight did you gain? Who taught it to you?</li>
            <li>A.k. has a dramatic story of migration that, along with his religion, inspires his ethical code. Write a fictional story about a migrant’s journey to a place they call home. What’s their code? How does their family history inspire it?</li>
          </ol>
        </div>
        {this.showEditor()}
        {responses.map(this.makeResponse.bind(this))}
      </div>
    )
  }
}

ResponseList.propTypes = {
  responses: React.PropTypes.array
}