import { CALL_API, getJSON } from 'redux-api-middleware'
import { browserHistory } from 'react-router'
import { loadStories } from './stories'
// import { Schema, arrayOf, normalize } from 'normalizr';

export const STORY_REQUEST = 'STORY_REQUEST'
export const STORY_SUCCESS = 'STORY_SUCCESS'
export const STORY_FAILURE = 'STORY_FAILURE'

// const normalizeSuccessStory = {
//   type: STORY_SUCCESS,
//   payload: (action, state, res) => {
//     return getJSON(res).then(function(json){
//       const prepareJson = {'stories': [json.stories]} //json array becomes 'stories' array after normalizing
//       return normalize(prepareJson, { stories: arrayOf(storySchema) })
//     })
//   }
// }

function fetchStory(id) {
  return {
    [CALL_API]: {
      endpoint: "/api/" + id,
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      types: [STORY_REQUEST, STORY_SUCCESS, STORY_FAILURE]
    }
  }
}

export function loadStory(id) {
  return (dispatch, getState) => {
    const story = getState().stories.stories[id]
    console.log(getState())
    if (story) {
      return null
    }
    return dispatch(loadStories())
  }
}