import React from 'react';
import {connect} from 'react-redux';
// import {pushState} from 'redux-router';
import { browserHistory } from 'react-router'
import { loadStory } from "../actions"

export default function LoadStory(Component) {
  class LoadedStory extends React.Component {

    componentWillMount() {
      this.checkStory()
    }

    checkStory() {
      if (!this.props.content) {
        console.log('no story')
        this.props.loadStory(this.props.params.id)
      }
    }

    render () {
      return (
        <div>
          <Component {...this.props}/>
        </div>
      )
    }
  }

  const mapStateToProps = (state, ownProps) => {
    const id = ownProps.params.id
    return state.data.stories[id] || {}
  }

  return connect(mapStateToProps, {
    loadStory
  })(LoadedStory);
}