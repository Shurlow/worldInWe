import React from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import { loadStories } from "../state/actions/stories"
import { uploadStory, uploadImage } from '../state/actions/image'
import { loadResponses } from "../state/actions/responses"

export default function wrapStory(Component) {
  class LoadedStory extends React.Component {

    componentWillMount() {
      if (this.props.story === undefined) {
        this.props.loadStories()
      }
      if (this.props.responses === null) {
        this.props.loadResponses(this.props.params.id)
      }
    }

    render () {
      return (
        <div>
          <Component
            responses={this.props.responses}
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
      responses: state.responses.data,
      isAuthenticated: state.auth.isAuthenticated,
      username: state.auth.username
    }
  }

  return connect(mapStateToProps, {
    loadStories,
    loadResponses,
    uploadStory,
    uploadImage
  })(LoadedStory);
}