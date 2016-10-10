import React from 'react'
import Responses from './Responses'
import wrapResponses from '../containers/wrapResponses'

export default class Story extends React.Component {

  componentWillMount() {
    window.scrollTo(0,0)
  }

  render() {
    let ResponsesWrap = wrapResponses(Responses)
    const { id, user_id, content, title, author, img, isAuthenticated, username } = this.props
    return (
      <div className='story'>
        <div className="story-image">
          <img src={img}></img>
        </div>
        <div className='story-content'>
          <article>
            <header className="story-header">
              <h3 className='title'>{title}</h3>
              <h3>produced by <span className='name'>{this.props.author}</span></h3>
              <h3>directed <span className='name'>{this.props.author}</span></h3>
            </header>
            <div className="story-text firstletter">
              {content}
            </div>
            <div className="story-sidebar">
              <p>facebook</p>
              <p>twitter</p>
              <p>dingo</p>
            </div>
            <ResponsesWrap
              isAuthenticated={isAuthenticated}
              username={username}
              user_id={user_id}
              story_id={id}
            />
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
  content: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  author: React.PropTypes.string.isRequired,
  img: React.PropTypes.string.isRequired
}