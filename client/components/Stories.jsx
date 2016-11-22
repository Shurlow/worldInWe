import React from 'react'
import ErrorPage from '../components/ErrorPage'
import { Link } from 'react-router'
import request from 'superagent'
import ImageLoader from 'react-imageloader'

export default class Stories extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      stories: null
    }
  }

  componentWillMount() {
    const { type, tag } = this.props.location.query
    this.fetchStories(type, tag)
  }

  fetchStories(type, tag) {
    let self = this
    request
      .get('/api')
      .set('Accept', 'application/json')
      .end(function(err, res) {
        self.setState({
          stories: res.body.stories
        })
      })
  }

  makeStoryCard(story) {
    const { id, title, img } = story
    console.log(img)
    return (
      <Link to={`story/${id}`} className='stories-link'>
        <ImageLoader
          src={`https://s3.amazonaws.com/wiw-thumb/${id}.jpg`}
          preloader={()=> <img className='loader' src='/res/loader.gif'/>}
        />
        <h4>{title}</h4>
      </Link>
    )
  }

  render() {
    const msg = 'Stories could not be found.'
    const stories = this.state.stories
    const { type, tag } = this.props.location.query
    return (
      <div className='page stories'>
        <header className='center'>
          <h3>{type}: <span className='name'>{tag}</span></h3>
        </header>
        <div className=''>
          { stories == null
            ? <ErrorPage code={404} message={msg}/>
            : stories.map(this.makeStoryCard)
          }
        </div>
      </div>
    )
  }
}