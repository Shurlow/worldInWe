import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { uploadImage, resetImage } from "../state/actions/image"
import { uploadStory } from "../state/actions/story"

export default function wrapCreate(Component) {
  class WrappedComponent extends React.Component {
    render() {
      return <Component {...this.props}/>
    }
  }

  const mapStateToProps = (state) => ({
    user_id: state.auth.id,
    src: state.image.src,
    url: state.image.url,
    isFetching: state.image.isFetching,
    imgError: state.image.isError,
    errorMessage: state.image.errorMessage
  })
  return connect(mapStateToProps, {
    uploadImage,
    uploadStory,
    resetImage
  })(WrappedComponent)
}