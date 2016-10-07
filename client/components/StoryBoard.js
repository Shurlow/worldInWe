import React from 'react'
import request from 'superagent'
import classnames from 'classnames'
import StoryBoardItem from './StoryBoardItem'
import LeadImage from './LeadImage.jsx'
import { loadStories } from '../actions/stories'
import { connect } from 'react-redux'

class StoryBoard extends React.Component {

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
        <LeadImage img={this.props.leadImageSrc} withLink={true}/>
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

function mapStateToProps(state, ownProps) {
  return {
    data: state.stories.data,
    ids: state.stories.ids
  }
}

export default connect(mapStateToProps, {
  loadStories
})(StoryBoard)