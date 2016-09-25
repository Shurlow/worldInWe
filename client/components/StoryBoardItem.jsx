// var React = require('react')
// var classnames = require('classnames')
// var storybox = classnames({'storybox': true})
// var textClass = classnames({'text': true})
import React from 'react'
import { browserHistory } from 'react-router'
import Image from './Image';

// import { Router, Route, Link, RouteHandler } from 'react-router'

export default class StoryBoardItem extends React.Component {

  navigateToStory() {
    browserHistory.push('stories/' + this.props.id)
  }

  imgError() {
    this._image.src = '/res/placeholder.png'
  }

  render() {
    const id = this.props.id
    const imgsrc = "https://s3-us-west-2.amazonaws.com/worldinme-full/" + id + ".jpg"
    const imgthumb = "https://s3-us-west-2.amazonaws.com/worldinme-thumbs/" + id + ".jpg"

    return (
      <div onClick={() => {browserHistory.push(`stories/${id}`)}}>
        <Image
          src={ imgsrc }
          preview={ imgthumb }
          width={ '100vw' }
          height={ '' }
        />
      </div>
    )
 }  

}
// <article
//           className="bg-white center mw8 mv4 item dt-ns"
//           onClick={this.navigateToStory.bind(this)}>
//           <div className="pa4 w-50-ns mb0 dtc-ns v-mid-ns">
//             <img
//               src={imgsrc}
//               className="w-100"
//               alt="Image not found"
//               ref={c => this._image = c}
//               onError={this.imgError.bind(this)}>
//             </img>
//           </div>
//           <div className="pa4 h-100 dtc-ns v-mid-ns relative">
//             <p className="f3 ma0 mb3 dim lh-title">{this.props.title}</p>
//             <p className="f4 gray ma0 mb4 lh-title">{this.props.firstline}</p>
//             <div className="absolute bottom-2 right-2 bar1"></div>
//           </div>
//         </article>
StoryBoardItem.defaultProps = {
  title: "No Title Found for This Story",
  firstline: "Here is a sample first line of a story that starts like this..."
}