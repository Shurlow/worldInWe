import { CALL_API, getJSON } from 'redux-api-middleware'
// import { browserHistory } from 'react-router'
import { Schema, arrayOf, normalize } from 'normalizr';

export const STORIES_REQUEST = 'STORIES_REQUEST'
export const STORIES_SUCCESS = 'STORIES_SUCCESS'
export const STORIES_FAILURE = 'STORIES_FAILURE'

const storySchema = new Schema('stories', {
  idAttribute: 'id'
});

const normalizeSuccess = {
  type: STORIES_SUCCESS,
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
      types: [STORIES_REQUEST, normalizeSuccess, STORIES_FAILURE]
    }
  }
}