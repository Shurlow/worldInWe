var React = require('react')
var classnames = require('classnames')
var storybox = classnames({'storybox': true})
var textClass = classnames({'text': true})
import { browserHistory } from 'react-router'

import { Router, Route, Link, RouteHandler } from 'react-router'

export default class StoryBoardItem extends React.Component {

  navigateToStory() {
    browserHistory.push('stories/' + this.props.id)
  }

  render() {
    // console.log('sb item', this.props)

    const imgsrc = "https://s3-us-west-2.amazonaws.com/worldinme-thumbs/" + this.props.id + ".jpg"
    const blursrc = "https://s3-us-west-2.amazonaws.com/worldinme-preview/" + this.props.id + ".jpg"
// <object class="avatar" data={imgsrc} type="image/jpg"></object>
    return (
        <article
          className="bg-white center mw8 ba b--black-10 mv4 item"
          onClick={this.navigateToStory.bind(this)}>
          <img src={imgsrc} className="w-80 center pt4 db"></img>
          <div className="pa4">
            <p className="f3 ma0 mb3 dim lh-title">{this.props.title}</p>
            <p className="f4 gray ma0 mb3 lh-title">{this.props.firstline}</p>
            <div className="fr bar1"></div>
          </div>
        </article>
    )
  }
}

StoryBoardItem.defaultProps = {
  title: "No Title Found for This Story",
  firstline: "Here is a sample first line of a story that starts like this..."
}