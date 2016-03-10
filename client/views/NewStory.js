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
  }

  pushImageUpload(id, imgData) {
    this.props.uploadImage(id, imgData)
  }
  pushStoryUpload(id, imgUrl, content, rawState) {
    this.props.uploadStory(id, imgUrl, content, rawState)
  }

  render() {

    return (
      <div className="new-story content">
        <ImageUploader
          id={this.props.id}
          src={this.props.img}
          isFetching={this.props.isFetching}
          pushImageUpload={this.pushImageUpload.bind(this)}
        />
        <div className="story">
          <CustomEditor
            id={this.props.id}
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
  id: guid()
}

// export default NewStory

const mapStateToProps = (state) => ({
  img: state.data.selectedStory.img,
  isFetching: state.data.isFetching
});

export default connect(mapStateToProps, {
  uploadStory,
  uploadImage
})(NewStory)
