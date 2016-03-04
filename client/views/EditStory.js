import React from 'react'
import ImageUploader from '../components/ImageUploader.jsx'
// import Story from '../views/Story'
import classnames from 'classnames'
import { fetchStory, uploadStory, uploadImage } from "../actions"
import CustomEditor from '../components/Editor'
import {connect} from "react-redux"

class EditStory extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchStory(this.props.params.id)
  }

  pushImageUpload(id, imgData) {
    this.props.uploadImage(id, imgData)
  }
  pushStoryUpload(id, img_url, content, rawState) {
    this.props.uploadStory(id, img_url, content, rawState)
  }

  render() {

    const id = this.props.id || guid()

    return (
      <div className="edit-story">
        <ImageUploader
          id={id}
          src={this.props.img}
          pushImageUpload={this.pushImageUpload.bind(this)}
        />
        <div className="story">
          <CustomEditor
            id={id}
            state={this.props.backup}
            pushStoryUpload={this.pushStoryUpload.bind(this)}
            backup={this.props.backup}
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

// EditStory.defaultProps = {
//   img: 'res/blankimg.png'
// }

export default EditStory

const mapStateToProps = (state) => ({
  backup: state.data.selectedStory.backup,
  img: state.data.selectedStory.img,
  id: state.data.selectedStory.id
});

export default connect(mapStateToProps, {
  fetchStory,
  uploadStory,
  uploadImage
})(EditStory)
