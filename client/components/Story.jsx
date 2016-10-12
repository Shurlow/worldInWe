import React from 'react'
import { browserHistory } from 'react-router'
import ResponseList from './ResponseList'
import wrapResponses from '../containers/wrapResponses'
import SocialButtons from './SocialButtons'
import Tags from './Tags'

export default class Story extends React.Component {

  componentWillMount() {
    window.scrollTo(0,0)
  }

  showEditButton() {
    console.log('show edit?', this.props.author_id, this.props.user_id)
    const {id, author_id, user_id } = this.props
    if (author_id === user_id) {
      return (
        <button
          className="edit"
          onClick={() => browserHistory.push(`edit/${id}`)}>
          Edit
        </button>
      )
    } else {
      return null
    }
  }

  render() {
    let WrappedResponseList = wrapResponses(ResponseList)
    const { id, token, tags, user_id, content, title, author, img, isAuthenticated, username } = this.props
    return (
      <div className='story'>
        <div className="story-image">
          <img src={img}></img>
        </div>
        <div className='story-content'>
          <article>
            <header className="story-header">
              <h3 className='title'>{title}</h3>
              <h3>produced by <span className='name'>{author}</span></h3>
              <h3>directed <span className='name'>{author}</span></h3>
            </header>
            <div className="story-text firstletter">
              {content}
            </div>
            <div className='story-sidebar'>
              <SocialButtons title={title}/>
              <Tags {...tags}/>
            </div>
            <WrappedResponseList
              isAuthenticated={isAuthenticated}
              username={username}
              user_id={user_id}
              story_id={id}
              token={token}
            />
            {this.showEditButton()}
          </article>
        </div>
      </div>
    )
  }
}

Story.defaultProps = {
  content: "",
  author: "anonymous",
  title: "No title",
  img: "/res/placeholder.png",
}

Story.propTypes = {
  id: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  author: React.PropTypes.string.isRequired,
  author_id: React.PropTypes.string.isRequired,
  img: React.PropTypes.string.isRequired
}