import React from 'react'
import { browserHistory } from 'react-router'
import ResponseList from './ResponseList'
import wrapResponses from '../containers/wrapResponses'
import SocialButtons from './SocialButtons'
import Tags from './Tags'
import ImageLoader from 'react-imageloader'
import { randomBgImg } from '../util'
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState} from 'draft-js';

export default class Story extends React.Component {

  componentWillMount() {
    window.scrollTo(0,0)
  }

  showEditButton() {
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
    const { id, token, tags, user_id, rawText, title, author, image, video, isAuthenticated, username } = this.props
    console.log('Has vid?', video)
    return (
      <div className='story'>
        <ImageLoader
          src={image}
          preloader={()=> <img className='loader' src='/res/loader.gif'/>}
          wrapper={React.DOM.div}
          imgProps={{className: 'source'}}
          className='lead-image'
        />
        <div className='content' style={{backgroundImage: `url(${randomBgImg()})`}}>
          <article>
            <header className="center">
              <h3 className='title'>{title}</h3>
              <h4>produced by <span className='name'>{author}</span></h4>
              <h4>directed <span className='name'>{author}</span></h4>
            </header>
            <p className="firstletter large-card" dangerouslySetInnerHTML={{__html: rawText}}>
            </p>
            <div className='story-sidebar'>
              <SocialButtons title={title}/>
              <Tags tags={tags}/>
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
  richContent: React.PropTypes.object,
  // rawText: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  author: React.PropTypes.string.isRequired,
  author_id: React.PropTypes.string.isRequired,
  img: React.PropTypes.string.isRequired
}
