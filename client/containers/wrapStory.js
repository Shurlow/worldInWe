import React from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import { loadStories } from "../state/actions/stories"
import { uploadStory, uploadImage } from '../state/actions/image'

export default function wrapStory(Component) {
  class LoadedStory extends React.Component {

    componentWillMount() {
      if (this.props.story === undefined) {
        this.props.loadStories()
      }
    }

    render () {
      return (
        <div>
          <Component
            isAuthenticated={this.props.isAuthenticated}
            username={this.props.username}
            {...this.props.story}
          />
        </div>
      )
    }
  }

  const mapStateToProps = (state, ownProps) => {
    const id = ownProps.params.id
    return {
      story: state.stories.data[id],
      isAuthenticated: state.auth.isAuthenticated,
      username: state.auth.username,
      user_id: state.auth.id
    }
  }

  return connect(mapStateToProps, {
    loadStories,
    uploadStory,
    uploadImage
  })(LoadedStory);
}