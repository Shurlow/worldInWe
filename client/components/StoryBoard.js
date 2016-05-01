import React from 'react'
import request from 'superagent'
import classnames from 'classnames'
import StoryBoardItem from './StoryBoardItem.jsx'
import LeadImage from './LeadImage.jsx'
import { loadStories } from '../actions'
import { connect } from 'react-redux'
// import ImageBlurLoader from 'react-imageblurloader';

class StoryBoard extends React.Component {

	constructor(props, context) {
		super(props, context)
	}

	componentWillMount() {
    this.props.loadStories('all')
	}

	preloader() {
    return <img className="image" src="/img/testbigimg.png" />;
  }

  getFirstLine(contentArray) {
    var newStr;
    if (contentArray) {
      var text = contentArray.toString()
      newStr = text.slice(0,50)  
    } else {
      newStr = ' '
    }
    return newStr
  }

	makeStoryItem(item) {
    console.log(item, typeof(item.content))
    let firstline = this.getFirstLine(item.content)
    // console.log('item:', item)
    // return <h1>Story: {item.title}</h1>
		return(
			<StoryBoardItem key={item.id} firstline={firstline} {...item}/>
		)
	}

  render() {

  	const imageStyle = {
  		image: true
  	}

    // console.log('SB props:', this.props)

    return (
    	<div className="content">
        <LeadImage img={this.props.leadImageSrc} withLink={true}/>
	    	<div className="storyboard">
					{this.props.storiesArray.map(this.makeStoryItem.bind(this))}
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
  const stories = state.data.stories
  const ids = state.result.stories
  const idArray = ids || { stories: [] }
  const storiesArray = idArray.map(id => stories[id])

  return {
    storiesArray
  }
}

export default connect(mapStateToProps, {
  loadStories
})(StoryBoard)