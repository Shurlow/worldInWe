import React from 'react'
import Link from 'react-router'
import Editor from '../components/Editor.jsx'
import ImageUploader from '../components/ImageUploader.jsx'
import RaisedButton from 'material-ui/lib/raised-button';
import { fetchStory, uploadImage } from "../actions"
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'


class Story extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    // console.log('Story Props:', this.props)
    this.props.fetchStory(this.props.params.id)
  }

  openEditor() {
    browserHistory.push('/edit/' + this.props.id)
  }

  render() {
    // console.log('story!', this.props.story)
    return (
      <div className="content">
        <ImageUploader
          src={this.props.img}
        />
        <div className="story">
          <div className="bar1" ></div>
          <RaisedButton className="story-button" label="Edit" onClick={this.openEditor.bind(this)}/>
          <div dangerouslySetInnerHTML={{__html: this.props.content}}></div>
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

const mapStateToProps = (state) => ({
  // story: state.data.selectedStory
  content: state.data.selectedStory.content,
  img: state.data.selectedStory.img,
  id: state.data.selectedStory.id
  // title: state.data.selectedStory.title,
  // author_name: state.data.selectedStory.author_name
});

export default connect(mapStateToProps, {
  fetchStory
})(Story)