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
    window.scrollTo(0,0)
  }

  makeReadableDate(utc) {
    const d = new Date(this.props.date)
    const day = d.getDate()
    const month = d.getMonth() + 1
    const year = d.getFullYear()
    const hours = ((d.getHours() + 11) % 12 + 1);
    const suffix = (d.getHours() >= 12)? 'pm' : 'am';
    const mins = d.getMinutes()
    return `${month} / ${day} / ${year} - ${hours}:${mins} ${suffix}`
  }

  // openEditor() {
  //   browserHistory.push('/edit/' + this.props.id)
  // }

  render() {

    return (
      <div className="mw-100 mw8-l center">
        <img src={this.props.img} className="w-100 center"></img>

        <article className="cf ph4 ph0-l h-100 pv5">
          <header className="fn fl-ns w-50-ns pr4-ns mb5">
            <h1 className="f2 lh-title fw9 mb3 mt0 pt3 bt bw2">{this.props.title}</h1>
            <h2 className="f3 mid-gray lh-title">{this.props.author_name}</h2>
            <time className="f6 ttu tracked gray">{this.makeReadableDate(this.props.date)}</time>
          </header>
          <div className="fn fl-ns w-50-ns h-100">
            <div className="f4 lh-copy measure mt0-ns pb7" dangerouslySetInnerHTML={{__html: this.props.content}}></div>
          </div>
        </article>
      </div>
    )
  }

}

Story.defaultProps = {
  content: "",
  author_name: "Anonymous",
  img: "/res/placeholder.png",
  date: Date.now()
}

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.params
  const story = state.data.stories[id] || {}
  return {
    id: story.id,
    title: story.title,
    content: story.content,
    img: story.img,
    author_name: story.name,
    date: story.date
  }
}

export default connect(mapStateToProps, {
  loadStory
})(Story)