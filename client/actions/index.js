import { CALL_API, getJSON } from 'redux-api-middleware'
import { Schema, arrayOf, normalize } from 'normalizr';
const storySchema = new Schema('stories', {
  idAttribute: 'id'
});

export const STORIES_REQUEST = 'STORIES_REQUEST'
export const STORIES_SUCCESS = 'STORIES_SUCCESS'
export const STORIES_FAILURE = 'STORIES_FAILURE'

const normalizeSuccess = {
  type: STORIES_SUCCESS,
  payload: (action, state, res) => {
    return getJSON(res).then((json) => normalize(json, { stories: arrayOf(storySchema) }))
  }
}

export const STORY_REQUEST = 'STORY_REQUEST'
export const STORY_SUCCESS = 'STORY_SUCCESS'
export const STORY_FAILURE = 'STORY_FAILURE'

const normalizeSuccessStory = {
  type: STORY_SUCCESS,
  payload: (action, state, res) => {
    return getJSON(res).then(function(json){
      const prepareJson = {'stories': [json.stories]} //json array becomes 'stories' array after normalizing
      return normalize(prepareJson, { stories: arrayOf(storySchema) })
    })
  }
}

export function loadStories() {
  return {
    [CALL_API]: {
      endpoint: "/api",
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      types: [STORIES_REQUEST, normalizeSuccess, STORIES_FAILURE]
    }
  }
}

export function fetchStory(id) {
  return {
    [CALL_API]: {
      endpoint: "/api/" + id,
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      types: [STORY_REQUEST, normalizeSuccessStory, STORY_FAILURE]
    }
  }
}

export function loadStory(id) {
  return (dispatch, getState) => {
    const story = getState().data.stories[id]
    if (story) {
      return null
    }
    return dispatch(fetchStory(id))
  }
}

// export function uploadStory(id) {
//   return (dispatch, getState) => {
//     const story = getState().data.stories[id]
//     if (story) {
//       return null
//     }
//     return dispatch(fetchStory(id))
//   }
// }

// export function uploadImage(id) {
//   return (dispatch, getState) => {
//     const story = getState().data.stories[id]
//     if (story) {
//       return null
//     }
//     return dispatch(fetchStory(id))
//   }
// }