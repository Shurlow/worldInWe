import React from 'react'
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
      .get(`/api?type=${type}&tag=${tag}`)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        self.setState({
          stories: res.body.stories
        })
      })
  }

  render() {
    const { type, tag } = this.props.location.query
    console.log('stories state:', this.state);
    return (
      <div className='page stories'>
        <header className='center'>
          <h3>{type}: <span className='name'>{tag}</span></h3>
        </header>
        <StoriesList stories={this.state.stories}/>
      </div>
    )
  }
}
