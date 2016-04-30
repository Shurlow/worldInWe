import React from 'react'
import Link from 'react-router'
import Editor from '../components/Editor.jsx'
import ImageUploader from '../components/ImageUploader.jsx'
import RaisedButton from 'material-ui/lib/raised-button';
import { loadStory } from "../actions"
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'


class Story extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.loadStory(this.props.params.id)
  }

  // openEditor() {
  //   browserHistory.push('/edit/' + this.props.id)
  // }

  render() {
    return (
      <div className="mw-100 mw8-l center">
        <img src={this.props.img} className="mw8 center"></img>
        <div className="story lh-copy pa4">
          <h1 className="f2">{this.props.title}</h1>
          <div className="f3 lh-copy" dangerouslySetInnerHTML={{__html: this.props.content}}></div>
          <div className="fr bar1"></div>
        </div>
      </div>
    )
  }

}

Story.defaultProps = {
  content: "",
  author_name: "Name",
  img: "/img/placeholder.png"
}

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.params
  const story = state.data.stories[id]
  return {
    id: story.id,
    title: story.title,
    content: story.content,
    img: story.img
  }
}

export default connect(mapStateToProps, {
  loadStory
})(Story)