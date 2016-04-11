var React = require('react')
var classnames = require('classnames')
// var imagesLoaded = require('imagesloaded')

var storybox = classnames({'storybox': true})
var textClass = classnames({'text': true})
// import ImageBlurLoader from '../../../react-imageblurloader/src/ImageBlurLoader.js'
// import ImageLoader from 'react-imageloader';
// import Image from './Image'
import { Router, Route, Link, RouteHandler } from 'react-router'

export default class StoryBoardItem extends React.Component {

  render() {

    const imgsrc = "https://s3-us-west-2.amazonaws.com/worldinme-thumbs/" + this.props.id + ".jpg"
    const blursrc = "https://s3-us-west-2.amazonaws.com/worldinme-preview/" + this.props.id + ".jpg"
// <object class="avatar" data={imgsrc} type="image/jpg"></object>
    return (
      <div className="storyboard_item">
        <Link to={'/stories/' + this.props.id}>
          <img src={imgsrc}></img>
          <div className="textover">
            <div className="center">
              <h1>{this.props.title}</h1>
              <h2>{this.props.firstline}...</h2>
              <h3>{this.props.author_name}</h3>
            </div>
            <div className="bar1"/>
          </div>
        </Link>
      </div>
    )
  }
}

StoryBoardItem.defaultProps = {
  title: "No Title Found for This Story",
  firstline: "Here is a sample first line of a story that starts like this..."
}