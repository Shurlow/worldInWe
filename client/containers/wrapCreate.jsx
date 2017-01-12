import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import {
  updateNewStory,
  uploadStory,
  uploadImage,
  resetNewStory
} from "../state/actions/newstory"

export default function wrapCreate(Component) {
  class WrappedComponent extends React.Component {
    render() {
      return <Component {...this.props}/>
    }
  }

  const mapStateToProps = (state) => ({
    user_id: state.auth.id,
    // src: state.image.src,
    image: state.newstory.image,
    video: state.newstory.video,
    isFetching: state.newstory.isFetching,
    isError: state.newstory.isError
  })

  return connect(mapStateToProps, {
    updateNewStory,
    uploadImage,
    uploadStory,
    resetNewStory
  })(WrappedComponent)
}
