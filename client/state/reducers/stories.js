import * as ActionTypes from '../actions/stories'
import { createReducer } from '../util.js';

const initialState = {
  data: {},
  ids: [],
  topic: {},
  isFetching: false,
  isError: false
}

export default createReducer(initialState, { 
  [ActionTypes.STORIES_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: true,
      isError: false
    })
  },
  [ActionTypes.STORIES_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: false,
      data: payload.entities.stories,
      ids: payload.result.stories
    })
  },
  [ActionTypes.STORIES_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      isError: true,
      isFetching: false
    })
  },
  [ActionTypes.TOPIC_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: true,
      isError: false
    })
  },
  [ActionTypes.TOPIC_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: false,
      topic: payload
    })
  },
  [ActionTypes.TOPIC_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      isError: true,
      isFetching: false
    })
  }
})