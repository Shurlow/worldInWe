import * as ActionTypes from '../actions/newstory'
import { createReducer } from '../util.js';

const initialState = {
  //Story
  id: null,
  title: null,
  author_id: null,
  producer: null,
  director: null,
  backup: null,
  rawText: null,
  image: null,
  video: null,
  //Tags
  form: null,
  theme1: null,
  theme2: null,
  location: null,
  //control flow
  isFetching: false,
  isError: null
}

export default createReducer(initialState, {
  [ActionTypes.UPDATE_NEW_STORY]: (state, payload) => {
    return Object.assign({}, state, {
      isError: null,
      ...payload
    })
  },
  [ActionTypes.UPLOAD_STORY_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: true,
      isError: null
    })
  },
  [ActionTypes.UPLOAD_STORY_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: false,
      isError: null
    })
  },
  [ActionTypes.UPLOAD_STORY_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: false,
      isError: 'upload story error'
    })
  },
  [ActionTypes.UPLOAD_IMAGE_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: true,
      isError: null,
      // src: payload
    })
  },
  [ActionTypes.UPLOAD_IMAGE_SUCCESS]: (state, payload) => {
    // console.log('img success reducer', payload)
    return Object.assign({}, state, {
      isFetching: false,
      isError: null,
      image: payload.url
    })
  },
  [ActionTypes.UPLOAD_IMAGE_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: false,
      isError: 'image upload error',
      src: null
    })
  },
  [ActionTypes.RESET_NEW_STORY]: (state, payload) => {
    return Object.assign({}, state, initialState)
  }
})
