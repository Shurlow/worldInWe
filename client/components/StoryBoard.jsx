import React from 'react'
import request from 'superagent'
import classnames from 'classnames'
import StoryBoardItem from './StoryBoardItem.jsx'
// import Image from './Image.jsx'
import ImageBlurLoader from 'react-imageblurloader';

class StoryBoard extends React.Component {

	constructor(props) {
		super(props)
	 	this.state = {
	 		stories: []
	 	}
	}

	componentDidMount() {
		var self = this
		request
			.get('http://localhost:3000/api')
			.set('Content-Type', 'application/json')
			.end(function(err, res) {
				self.setState({
					stories: res.body
				})
			})
	}

	preloader() {
    return <img className="image" src="/img/testbigimg.png" />;
  }

	makeStoryItem(item) {
		return(
			<StoryBoardItem key={item.id} {...item}/>
		)
	}

  render() {

  	const imageStyle = {
  		image: true
  	}

    return (
    	<div>
        <img className="bigimage" src={"/img/trees.jpeg"}></img>
	    	<ul className="storyboard">
					{this.state.stories.map(this.makeStoryItem)}
		    </ul>
		  </div>
    )
  }

}

export default StoryBoard

// <ImageBlurLoader
// src={"/img/trees.jpeg"}
// preview={"/img/testbigimg.png"}
// />

// <Image className="frontimage" src="/img/trees.jpeg" preview="/img/testbigimg.png" />