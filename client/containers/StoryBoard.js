import React from 'react'
import request from 'superagent'
import classnames from 'classnames'
import StoryBoardItem from '../components/StoryBoardItem'
import { loadStories } from '../state/actions/stories'
import { connect } from 'react-redux'

export default class StoryBoard extends React.Component {

	constructor(props, context) {
		super(props, context)
	}

	componentWillMount() {
    this.props.loadStories()
	}

	makeStoryItem(id) {
    const data = this.props.data[id]
		return <StoryBoardItem key={id} {...data}/>
	}

  render() {
    return (
    	<div>
        <article
          style={{backgroundImage: `url(${this.props.leadImageSrc})`}}>
          <div className='caption'>
            <h1>Rumee</h1>
          </div>
        </article>
	    	<div className="storyboard">
					{this.props.ids.map(this.makeStoryItem.bind(this))}
		    </div>
		  </div>
    )
  }
}

StoryBoard.defaultProps = {
  leadImageSrc: pickRandomImage()
}

function pickRandomImage() {
  var randomIndex = Math.floor(Math.random() * 8) + 1
  return `/res/leadimg/${randomIndex}.jpg`
}