import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { loadResponses, uploadResponse, deleteResponse } from "../state/actions/responses"

export default function wrapResponses(Component) {
  class WrappedComponent extends React.Component {
    
    componentWillMount() {
      this.props.loadResponses(this.props.story_id)
    }
    
    render() {
      return (
        <div>
          { this.props.responses == null
            ? <img src='img/loader.gif'/>
            : <Component {...this.props}/>
          }
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    responses: state.responses.data,
    isFetching: state.responses.isFetching,
    isUploading: state.responses.isUploading
  })
  return connect(mapStateToProps, {
    loadResponses,
    uploadResponse,
    deleteResponse
  })(WrappedComponent)
}