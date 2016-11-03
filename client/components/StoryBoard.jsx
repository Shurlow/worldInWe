import React from 'react'
import request from 'superagent'
import classnames from 'classnames'
import StoryBoardItem from './StoryBoardItem'
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
    const { id, description, img } = this.props.topic
    // console.log(id, description)
    return (
    	<div>
        <article
          style={{backgroundImage: `url(${img})`}}>
          <div className='caption'>
            <h1>{id}</h1>
          </div>
        </article>
	    	<div className="storyboard">
					{this.props.ids.map(this.makeStoryItem.bind(this))}
		    </div>
		  </div>
    )
  }
}

// StoryBoard.defaultProps = {
//   leadImageSrc: pickRandomImage()
// }

// function pickRandomImage() {
//   var randomIndex = Math.floor(Math.random() * 8) + 1
//   return `/res/leadimg/${randomIndex}.jpg`
// }