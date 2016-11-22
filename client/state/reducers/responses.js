import * as ActionTypes from '../actions/responses'
import { createReducer } from '../util.js';

const initialState = {
  data: null,
  isFetching: false,
  isUploading: false,
  isError: false
}

export default createReducer(initialState, { 
  [ActionTypes.RESPONSES_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: true,
      isError: false
    })
  },
  [ActionTypes.RESPONSES_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: false,
      data: payload
    })
  },
  [ActionTypes.RESPONSES_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      isError: payload,
      isFetching: false
    })
  },
  [ActionTypes.UPLOAD_RESPONSE_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isUploading: true,
      isError: false
    })
  },
  [ActionTypes.UPLOAD_RESPONSE_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      isUploading: false
    })
  },
  [ActionTypes.UPLOAD_RESPONSE_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      isError: true,
      isUploading: false
    })
  },
  [ActionTypes.UPDATE_NEW_RESPONSE]: (state, payload) => {
    return Object.assign({}, state, payload)
  }
})