import {
  RECEIVE_STORIES,
  FETCH_STORY_REQ,
  RECEIVE_STORY,
  STORY_UPLOAD_START,
  STORY_UPLOAD_SUCCESS,
  STORY_UPLOAD_ERROR,
  UPLOAD_IMAGE_SUCCESS
} from '../constants.js'
import {createReducer} from '../util.js';

const initialState = {
  stories: [],
  selectedStory: {},
  isFetching: false,
  isError: false
}

export default createReducer(initialState, {
  [RECEIVE_STORIES]: (state, payload) => {
    return Object.assign({}, state, {
      'stories': payload.data
    })
  },
  [FETCH_STORY_REQ]: (state, payload) => {
    return Object.assign({}, state, {
      'isFetching': true
    })
  },
  [RECEIVE_STORY]: (state, payload) => {
    return Object.assign({}, state, {
      'selectedStory': payload.data
    })
  },
  [STORY_UPLOAD_START]: (state, payload) => {
    return Object.assign({}, state, {
      'isFetching': true
    })
  },
  [STORY_UPLOAD_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isFetching': false
    })
  },
  [STORY_UPLOAD_ERROR]: (state, payload) => {
    return Object.assign({}, state, {
      'isFetching': false
    })
  },
  [UPLOAD_IMAGE_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isFetching': false
    })
  }

})