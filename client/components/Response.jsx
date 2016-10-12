import React from 'react'
import moment from 'moment'

export default class Response extends React.Component {
  
  showDelete() {
    const { id, user_id, author_id, story_id, deleteResponse, token } = this.props
    if (author_id === user_id) {
      return <button onClick={() => deleteResponse(id, token, story_id)}>delete</button>
    } else {
      return null
    }
  }

  render() {
    const { id, title, author, content, date } = this.props
    let d = moment.parseZone(date).local().format("MMM / D / YY")
    return (
      <div key={id} className='response'>
        <div className='response-left'>
          <p>{title}</p>
          <p>{author}</p>
          <p>{d}</p>
        </div>
        <div className='response-right'>
          <p>{content}</p>
        </div>
        {this.showDelete()}
      </div>
    )
  }
}