import React from 'react'
import request from 'superagent'
import classnames from 'classnames'
import StoryBoardItem from './StoryBoardItem'
import { Link, browserHistory } from 'react-router'
// import { loadStories } from '../state/actions/stories'
import { connect } from 'react-redux'

export default class StoryBoard extends React.Component {

	constructor(props, context) {
		super(props, context)
	}

	componentWillMount() {
    this.props.loadTopic()
    this.props.loadStories()
	}

	makeStoryItem(id) {
    const data = this.props.data[id]
		return <StoryBoardItem key={id} {...data}/>
	}

  render() {
    const { id, description, image } = this.props.topic
    return (
    	<div>
        <article
					className='fancy'
          style={{backgroundImage: `url(${image})`}}>
          <div className='caption'>
						<Link to='rumee'>
            <h1>{id}</h1>
					</Link>
          </div>
        </article>
	    	<div className="storyboard">
					{this.props.ids.map(this.makeStoryItem.bind(this))}
		    </div>
		  </div>
    )
  }
}
