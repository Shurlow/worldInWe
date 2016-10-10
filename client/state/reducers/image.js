import * as ActionTypes from '../actions/image'
import { createReducer } from '../util.js';

const initialState = {
  img: null,
  isFetching: false,
  isError: false
}

export default createReducer(initialState, { 
  [ActionTypes.UPLOAD_IMAGE_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: true,
      isError: false
    })
  },
  [ActionTypes.UPLOAD_IMAGE_SUCCESS]: (state, payload) => {
    const updatedSelection = Object.assign(state.selectedStory, {
      img: payload
    })
    // console.log('OLD:', state.selectedStory, "NEW:", updatedSelection)
    return Object.assign({}, state, {
      'isFetching': false,
      'selectedStory': updatedSelection
    })
  },
  [ActionTypes.UPLOAD_IMAGE_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: false,
      isError: true
    })
  }
})