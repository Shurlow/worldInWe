import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { loadStories, loadTopic } from '../state/actions/stories'

export default function wrapStories(Component) {
  class WrappedComponent extends React.Component {
    render() {
      return <Component {...this.props}/>
    }
  }

  const mapStateToProps = (state) => ({
    data: state.stories.data,
    ids: state.stories.ids,
    topic: state.stories.topic
  })

  return connect(mapStateToProps, {
    loadStories,
    loadTopic
  })(WrappedComponent)
}
