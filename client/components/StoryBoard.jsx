import React from 'react'
import request from 'superagent'
import classnames from 'classnames'
import StoryBoardItem from './StoryBoardItem.jsx'

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

	makeStoryItem(item) {
		return(
			<StoryBoardItem
				key={item.id}
				id={item.id}
				img={item.img}
				text={item.text}
				author_name={item.author_name} />
		)
	}

  render() {
    return (
    	<div>
	    	<ul className="storyboard">
					{this.state.stories.map(this.makeStoryItem)}
		    </ul>
		  </div>
    )
  }

}

export default StoryBoard