import React from 'react'
import request from 'superagent'
import classnames from 'classnames'
// import StoryBoardItem from './StoryBoardItem.jsx'
// import Image from './Image.jsx'
// import ImageBlurLoader from 'react-imageblurloader';

class StoryBoard extends React.Component {

	constructor(props, context) {
		super(props, context)
	 	this.state = {
	 		stories: [1,2,3]
	 	}
	}

	componentDidMount() {
    console.log('did mount storyboard')
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
    // console.log(firstline)
    return <h1>Story</h1>
		// return(
		// 	<StoryBoardItem key={item.id} firstline={firstline} {...item}/>
		// )
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
	    	<div className="storyboard">
					{this.state.stories.map(this.makeStoryItem.bind(this))}
		    </div>
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