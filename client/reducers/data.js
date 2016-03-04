import {
  RECEIVE_STORIES,
  FETCH_STORY_REQ,
  RECEIVE_STORY,
  STORY_UPLOAD_START,
  STORY_UPLOAD_SUCCESS,
  STORY_UPLOAD_ERROR,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_REQ
} from '../constants.js'
import {createReducer} from '../util.js';

const initialState = {
  stories: [],
  selectedStory: {
    id: null,
    content: [],
    backup: null,
    img: "/res/blankimg.png",
  },
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
      'selectedStory': payload.data,
      'isFetching': false
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
  [UPLOAD_IMAGE_REQ]: (state, payload) => {
    return Object.assign({}, state, {
      'isFetching': true
    })
  },
  [UPLOAD_IMAGE_SUCCESS]: (state, payload) => {
    const updatedSelection = Object.assign(state.selectedStory, {
      img: payload
    })
    console.log('OLD:', state.selectedStory, "NEW:", updatedSelection)
    return Object.assign({}, state, {
      'isFetching': false,
      'selectedStory': updatedSelection
    })
  }

})