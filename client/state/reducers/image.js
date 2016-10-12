import * as ActionTypes from '../actions/image'
import { createReducer } from '../util.js';

const initialState = {
  src: null,
  url: null,
  bgsrc: null,
  isFetching: false,
  isError: false,
  errorMessage: null
}

export default createReducer(initialState, { 
  [ActionTypes.UPLOAD_IMAGE_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: true,
      isError: false
    })
  },
  [ActionTypes.UPLOAD_IMAGE_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: false,
      isError: false,
      errorMessage: null,
      url: payload.url,
      src: payload.src
    })
  },
  [ActionTypes.UPLOAD_IMAGE_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: false,
      isError: true,
      errorMessage: payload.statusText,
      src: null
    })
  },
  [ActionTypes.RESET_IMAGE]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: false,
      isError: true,
      errorMessage: null,
      src: null,
      url: null
    })
  }
})