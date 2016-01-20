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
			.get('http://worldinme.xyz/api/')
			.set('Content-Type', 'application/json')
			.end(function(err, res) {
        if (err) return console.log(err)
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
    	<div className="content">
        <div className="leadimage">
          <img src="/img/trees.jpeg"></img>
          <div className="leadinfo">
            <h1>This is a Cabin in Front of Some Trees</h1>
            <h2>Here is a subheading or maybe the first few lines of the featured text ...</h2>
            <div className="bar1"/>
          </div>
        </div>
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