var React = require('react')
var classnames = require('classnames')
// var imagesLoaded = require('imagesloaded')

var storybox = classnames({'storybox': true})
var textClass = classnames({'text': true})
// import ImageBlurLoader from '../../../react-imageblurloader/src/ImageBlurLoader.js'
import ImageLoader from 'react-imageloader';
// import Image from './Image.jsx'
import { Router, Route, Link, RouteHandler } from 'react-router'

export default class StoryBoardItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      preview: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gODAK/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/9sAQwEKCwsODQ4cEBAcOygiKDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7/8AAEQgADQAUAwEiAAIRAQMRAf/EABgAAAMBAQAAAAAAAAAAAAAAAAAFBwYI/8QAJBAAAgEDBAICAwAAAAAAAAAAAQIDAAQRBQYSIQcxE0FxgcL/xAAVAQEBAAAAAAAAAAAAAAAAAAABAv/EABcRAQEBAQAAAAAAAAAAAAAAAAAhERL/2gAMAwEAAhEDEQA/AH8W9k1xVittwG2u5UINrb2/Jo8ZZjzbphx6BA91qdnzXFzognnuprlHkb4XmILlB12QB9gnuuarZn0vcJhgkbEUrxqSe8HkufziqL423XNo9huWQ2yzJC0c6xh+ABbKn6OPQqcp6lVsas8t1dQwWbSC2lETPzABPBW/rFFJfHGpS6ztybVZURJL29llZVzhewAP0AKKQ//Z"
    }
  }

  preloader() {
    return <img className="preview" src="/img/placeholder.png" />;
  }

  load(e) {
    // console.log(e)
  }

  render() {

    return (
      <li>
        <Link to={'/stories/' + this.props.id}>
          <ImageLoader
            src={"https://s3-us-west-2.amazonaws.com/world-in-me-thumbs/" + this.props.id + ".jpg"}
            wrapper={React.DOM.div}
            preloader={this.preloader}
            onLoad={this.load}
            className="storythumb">
            Image load failed!
          </ImageLoader>
          <div className="textover">
            <h3>{this.props.title}</h3>
            <h4>{this.props.author_name}</h4>
            <div className="bar2"/>
          </div>
        </Link>
      </li>
    )
  }
}