import { CALL_API, getJSON } from 'redux-api-middleware'
import { Schema, arrayOf, normalize } from 'normalizr';
const storySchema = new Schema('stories');

export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'

const normalizeSuccess = {
  type: 'SUCCESS',
  payload: (action, state, res) => {
    return getJSON(res).then((json) => normalize(json, { stories: arrayOf(storySchema) }))
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
      types: ['REQUEST', normalizeSuccess, 'FAILURE']
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
      types: ['REQUEST', 'SUCCESS', 'FAILURE']
    }
  }
}

export function loadStory(id) {
  return (dispatch, getState) => {
    console.log(getState().data.stories)
    // const story = getState().data.stories[id]
    if (true) {
      return null
    }

    return dispatch(fetchStory(id))
  }
}