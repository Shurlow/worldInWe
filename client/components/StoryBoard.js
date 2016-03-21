import React from 'react'
import request from 'superagent'
import classnames from 'classnames'
import StoryBoardItem from './StoryBoardItem.jsx'
import LeadImage from './LeadImage.jsx'
// import ImageBlurLoader from 'react-imageblurloader';

class StoryBoard extends React.Component {

	constructor(props, context) {
		super(props, context)
	}

	componentDidMount() {
    // console.log('did mount storyboard')
	}

	preloader() {
    return <img className="image" src="/img/testbigimg.png" />;
  }

  // getFirstLine(str) {
  //   let newStr = str.slice(0,50)
  //   // console.log(newStr)
  //   return newStr
  // }

	makeStoryItem(item) {
    // let firstline = this.getFirstLine(item.text)
    // return <h1>Story: {item.title}</h1>
		return(
			<StoryBoardItem key={item.id} {...item}/>
		)
	}

  render() {

  	const imageStyle = {
  		image: true
  	}

    return (
    	<div className="content">
        <LeadImage img={'/res/greenkid.jpeg'} withLink={true}/>
	    	<div className="storyboard">
					{this.props.stories.map(this.makeStoryItem.bind(this))}
		    </div>
		  </div>
    )
  }

}

StoryBoard.defaultProps = {
  stories: []
}

StoryBoard.propTypes = {
  stories: React.PropTypes.array.isRequired
}

export default StoryBoard