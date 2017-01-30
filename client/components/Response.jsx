import React from 'react'
import classnames from 'classnames'
// import moment from 'moment'

export default class Response extends React.Component {

  renderDelete(showDelete) {
    const { id, token, story_id, deleteResponse } = this.props
    if (showDelete) {
      return <button className='secondary' onClick={() => deleteResponse(id, token, story_id)}>delete</button>
    } else {
      return null
    }
  }

  render() {
    const { id, title, author, author_id, user_id, content, length, date } = this.props
    let showDelete = (author_id === user_id)
    // let d = moment.parseZone(date).local().format("MMM / D / YY")
    const rightStyles = classnames({
      'response-right': true,
      'with-button': showDelete
    })
    return (
      <div key={id} className='response'>
        <div className='response-left'>
          <h3 className='top'>{title}</h3>
          <h4>{author}</h4>
          <h3 className='wc'>{length + ' words'}</h3>  
        </div>
        <div className={rightStyles}>
          <span className='response-content'>{content}</span>
        </div>
        {this.renderDelete(showDelete)}
      </div>
    )
  }
}
