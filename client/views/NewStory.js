import React from 'react'
import ImageUploader from '../components/ImageUploader.jsx'
// import Story from '../views/Story'
import classnames from 'classnames'
import { uploadStory, uploadImage } from "../actions"
import CustomEditor from '../components/Editor'
import {connect} from "react-redux"

class NewStory extends React.Component {

  constructor(props) {
    super(props)
    console.log('Proops!', props)
  }

  pushImageUpload(imgData) {
    this.props.uploadImage(this.props.new_story_id, imgData)
  }

  pushStoryUpload(title, imgUrl, content, rawState) {
    this.props.uploadStory(this.props.new_story_id, this.props.auth_id, title, imgUrl, content, rawState)
  }

  render() {
    console.log('Auth:', this.props.auth_id, 'Story:', this.props.new_story_id)
    return (
      <div className="new-story content">
        <ImageUploader
          src={this.props.img}
          isFetching={this.props.isFetching}
          pushImageUpload={this.pushImageUpload.bind(this)}
        />
        <div className="story">
          <CustomEditor
            id={this.props.new_story_id}
            pushStoryUpload={this.pushStoryUpload.bind(this)}
          />
        </div>
      </div>
    )
  }
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4();
}

NewStory.defaultProps = {
  new_story_id: guid()
}

// export default NewStory

const mapStateToProps = (state) => ({
  img: state.data.selectedStory.img,
  isFetching: state.data.isFetching,
  auth_id: state.auth.id
});

export default connect(mapStateToProps, {
  uploadStory,
  uploadImage
})(NewStory)
