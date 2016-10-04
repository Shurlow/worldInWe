import React from 'react'
import Link from 'react-router'
// import Editor from '/Editor.jsx'
// import ImageUploader from './ImageUploader'
// import { loadStory } from "../actions"
// import { connect } from 'react-redux'
// import { browserHistory } from 'react-router'

export default class Story extends React.Component {

  // constructor(props) {
  //   super(props)
  // }

  componentWillMount() {
    // this.props.loadStory(this.props.params.id)
    window.scrollTo(0,0)
  }

  // makeReadableDate(utc) {
  //   const d = new Date(this.props.date)
  //   const day = d.getDate()
  //   const month = d.getMonth() + 1
  //   const year = d.getFullYear()
  //   const hours = ((d.getHours() + 11) % 12 + 1);
  //   const suffix = (d.getHours() >= 12)? 'pm' : 'am';
  //   const mins = d.getMinutes()
  //   return `${month} / ${day} / ${year} - ${hours}:${mins} ${suffix}`
  // }

  // makeContentBlock(block) {
  //   return (
  //     <div
  //       className="lh-copy measure mb3"
  //       dangerouslySetInnerHTML={{__html: block}}>
  //     </div>
  //   )
  // }

  // openEditor() {
  //   browserHistory.push('/edit/' + this.props.id)
  // }

  render() {
    const { content, title, author, img } = this.props

    return (
      <div className='story'>
        <div className="story-image">
          <img src={img}></img>
        </div>
        <div className='story-content'>
          <article>
            <header className="story-header">
              <h3 className='title'>{title}</h3>
              <h3>produced by <span className='name'>{this.props.author}</span></h3>
              <h3>directed <span className='name'>{this.props.author}</span></h3>
            </header>
            <div className="story-text">
              {content}
            </div>
            <div className="story-sidebar">
              <p>facebook</p>
              <p>twitter</p>
              <p>dingo</p>
            </div>
          </article>
        </div>
      </div>
    )
  }

}

Story.defaultProps = {
  content: [""],
  author: "anonymous",
  title: "No title",
  img: "/res/placeholder.png",
}

Story.propTypes = {
  content: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  author: React.PropTypes.string.isRequired,
  img: React.PropTypes.string.isRequired
}