import React from 'react'
import ImageUploader from '../components/ImageUploader.jsx'
// import Story from '../views/Story'
import classnames from 'classnames'
import { fetchStory, updateStory, uploadImage } from "../actions"
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

  pushStoryUpdate(id, title, imgUrl, content, rawState) {
    this.props.updateStory(id, title, content, rawState)
  }

  render() {
    const id = this.props.id || guid()
    return (
      <div className="edit-story content">
        <ImageUploader
          id={id}
          src={this.props.img}
          pushImageUpload={this.pushImageUpload.bind(this)}
        />
        <div className="story">
          <CustomEditor
            id={id}
            state={this.props.backup}
            pushStoryUpload={this.pushStoryUpdate.bind(this)}
            backup={this.props.backup}
            title={this.props.title}
          />
        </div>
      </div>
    )
  }
}

export default EditStory

const mapStateToProps = (state) => ({
  backup: state.data.selectedStory.backup,
  title: state.data.selectedStory.title,
  img: state.data.selectedStory.img,
  id: state.data.selectedStory.id
});

export default connect(mapStateToProps, {
  fetchStory,
  updateStory,
  uploadImage
})(EditStory)
