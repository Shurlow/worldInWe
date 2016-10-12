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
        <label>
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
      <div className='story-responses'>
        <h3 className='story-header'>Respond</h3>
        <p className='textcard'> New to the program? blah blah blah</p>
        {this.showEditor()}
        {responses.map(this.makeResponse.bind(this))}
      </div>
    )
  }
}

ResponseList.propTypes = {
  responses: React.PropTypes.array
}