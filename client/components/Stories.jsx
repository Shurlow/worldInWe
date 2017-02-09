import React from 'react'
// import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import StoriesList from './StoriesList'
import request from 'superagent'


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
      .get(`/api/stories/?type=${type}&tag=${tag}`)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        self.setState({
          stories: res.body
        })
      })
  }

  render() {
    const { type, tag } = this.props.location.query
    return (
      <div className='page stories content'>
        <article>
          <header className='center'>
            <button className='back' onClick={browserHistory.goBack}>⬅</button>
            <h3>{type}: <span className='name'>{tag}</span></h3>
          </header>
          <StoriesList stories={this.state.stories}/>
        </article>
      </div>
    )
  }
}
