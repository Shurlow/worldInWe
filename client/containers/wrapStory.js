import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { loadStories } from "../state/actions/stories"
import { uploadStory, uploadImage } from '../state/actions/image'
import ErrorPage from '../components/ErrorPage'

export default function wrapStory(Component) {
  class LoadedStory extends React.Component {

    componentWillMount() {
      if (this.props.story === undefined) {
        this.props.loadStories()
      }
    }

    render () {
      const { isAuthenticated, story, user_id, username, token } = this.props
      return (
        <div>
          { story == null
            ? <ErrorPage 
                code={404}
                message={`Story: ${this.props.params.id} could not be found.`}
              />
            : <Component
                isAuthenticated={isAuthenticated}
                username={username}
                token={token}
                user_id={user_id}
                {...story}
              />
          }
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
      user_id: state.auth.id,
      token: state.auth.token
    }
  }

  return connect(mapStateToProps, {
    loadStories,
    uploadStory,
    uploadImage
  })(LoadedStory);
}