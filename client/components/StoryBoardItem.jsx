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