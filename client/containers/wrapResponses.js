import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { loadResponses, uploadResponse } from "../state/actions/responses"

export default function wrapResponses(Component) {
  class WrappedComponent extends React.Component {
    componentWillMount() {
      if (this.props.responses == null) {
        this.props.loadResponses(this.props.story_id)
      }
    }
    render() {
      return <Component {...this.props}/>
    }
  }

  const mapStateToProps = (state) => ({
    responses: state.responses.data,
    isFetching: state.responses.isFetching,
    isUploading: state.responses.isUploading
  })
  return connect(mapStateToProps, {
    loadResponses,
    uploadResponse
  })(WrappedComponent)
}