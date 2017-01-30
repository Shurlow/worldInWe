import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { loadStories } from "../state/actions/stories"
import ErrorPage from '../components/ErrorPage'
// import wrapWithTryCatch from 'react-try-catch-render'

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
          { story
            ? <Component
                isAuthenticated={isAuthenticated}
                username={username}
                token={token}
                user_id={user_id}
                {...story}
              />
            : <ErrorPage message='Story could not be found'/>
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
    loadStories
  })(LoadedStory);
}
