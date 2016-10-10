import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { loadStories } from '../state/actions/stories'

export default function wrapStories(Component) {
  class WrappedComponent extends React.Component {
    render() {
      return <Component {...this.props}/>
    }
  }

  const mapStateToProps = (state) => ({
    data: state.stories.data,
    ids: state.stories.ids
  })
  return connect(mapStateToProps, {
    loadStories
  })(WrappedComponent)
}