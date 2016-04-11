import React from 'react'
import ImageUploader from '../components/ImageUploader.jsx'
import RaisedButton from 'material-ui/lib/raised-button';
// import Story from '../views/Story'
import classnames from 'classnames'
import { fetchStory, updateStory, uploadImage, deleteStory } from "../actions"
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
    this.props.uploadImage(this.props.id, imgData)
  }
  pushDeleteStory() {
    this.props.deleteStory(this.props.id)
  }

  pushStoryUpdate(title, imgUrl, content, rawState) {
    this.props.updateStory(this.props.id, title, content, rawState)
  }

  render() {
    return (
      <div className="edit-story content">
        <ImageUploader
          id={this.props.id}
          src={this.props.img}
          pushImageUpload={this.pushImageUpload.bind(this)}
        />
        <div className="story">
          <CustomEditor
            id={this.props.id}
            state={this.props.backup}
            pushStoryUpload={this.pushStoryUpdate.bind(this)}
            backup={this.props.backup}
            title={this.props.title}
          />
          <RaisedButton
            className="story-button"
            label="Delete"
            onClick={this.pushDeleteStory.bind(this)}
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
  id: state.data.selectedStory.id,
  auth_id: state.auth.id
});

export default connect(mapStateToProps, {
  fetchStory,
  updateStory,
  uploadImage,
  deleteStory
})(EditStory)
